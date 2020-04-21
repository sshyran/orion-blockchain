const Web3 = require("web3");
const web3 = new Web3("https://ropsten.infura.io/v3/e7e50056370b47e0b71bdbc746887727");
const web3Websocket = require("./infuraWeb3");
const History = require("./models/history");
const _ = require("lodash");

require('colors');

// Artifacts
const WBTCArtifact = require("../abis/WBTC.json");
const exchangeArtifact = require("../abis/Exchange.json");

const ERC20_ABI = require("../abis/erc20");

const Contracts = {
    exchange: new web3.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address)
};

const Tokens = {
    wbtc: "0x335123EB7029030805864805fC95f1AB16A64D61",
    wxrp: "0x15a3Eb660823e0a3eF4D4A86EEC0d66f405Db515",
    usdt: "0xfe2277A8790C6CFfA33bfe832D186385C45201A0"
};

const ethAssetAddress = "0x0000000000000000000000000000000000000000"; // ETH  "asset" address in balanaces

class InfuraNode {

    static formatValue(value){
        return value
        // return value.toLocaleString('en-US', {
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 8
        // });
    }

    static async getWalletBalances(address) {

        let balanceEth = await this.getWalletBalance(ethAssetAddress, address);
        let balanceWBTC = await this.getWalletBalance(Tokens.wbtc, address);
        let balanceWXRP = await this.getWalletBalance(Tokens.wxrp, address);
        let balanceUSDT = await this.getWalletBalance(Tokens.usdt, address);

        return {
            'ETH': this.formatValue(balanceEth),
            'WBTC': this.formatValue(balanceWBTC),
            'WXRP': this.formatValue(balanceWXRP),
            'USDT':  this.formatValue(balanceUSDT)
        }
    }

    static async getWalletBalance(assetAddress, userAddress){
        if(assetAddress === ethAssetAddress){
            let ethBalance = await web3.eth.getBalance(userAddress);
            return web3.utils.fromWei(ethBalance.toString())
        }

        const token = new web3.eth.Contract(ERC20_ABI, assetAddress)
        const balance = await token.methods.balanceOf(userAddress).call();
        const decimals = await token.methods.decimals().call();
        return balance*10**(-decimals);
    }

    static async getContractBalances(address) {
        const assets = [ethAssetAddress, Tokens.wbtc, Tokens.wxrp, Tokens.usdt];
        let balances = await Contracts.exchange.methods.getBalances(assets, address).call();

        return {
            'ETH': this.formatValue(balances[0]/10**8),
            'WBTC': this.formatValue(balances[1]/10**8),
            'WXRP': this.formatValue(balances[2]/10**8),
            'USDT': this.formatValue(balances[3]/10**6),
        }

    }

    static async assetDescription(assetAddress){
        if (!assetAddress || assetAddress === ethAssetAddress) return {name: 'Ether', symbol: "ETH", decimals: 18}
        const token = new web3.eth.Contract(ERC20_ABI, assetAddress)
        const name = await token.methods.name().call();
        const symbol = await token.methods.symbol().call();
        const decimals = await token.methods.decimals().call();

        return {name, symbol, decimals};
    }


    static async getBalanceChanges(address){        
        let depositEvents = await Contracts.exchange.getPastEvents("NewAssetDeposit", {
            filter:{user:address},
            fromBlock: 4966311,
            toBlock: 'latest'
        })

        let withdrawEvents = await Contracts.exchange.getPastEvents("NewAssetWithdrawl", {
            filter:{user:address},
            fromBlock: 4966311,
            toBlock: 'latest'
        })

        return {depositEvents, withdrawEvents};
    }


    static async watchBalanceChange (){

        let clients = {};
        let clientAddresses = {};
        
        const io = require('socket.io')(3002);
        io.on('connection', client => {
            // Client suscribes to a specific address 
            client.on('clientAddress', address => {
                if (!clients[address]) {
                    clients[address] = new Set();
                }
                clients[address].add(client.id);
                clientAddresses[client.id] = address;
                console.log(`Client ${client.id} suscribed to changes in address ${address}`);
                client.join(address);
            });

            // Client joins all balance changes room
            client.on('getAllChanges', () => {
                client.join('allChanges');
                console.log(`Client ${client.id} suscribed to all balance Changes`);
            });

            //When client disconnects, delete that record from object
            client.on('disconnect', () => { 
                console.log("client disconnected");
                const addr = clientAddresses[client.id];
                if (clients[addr]) {
                    clients[addr].delete(client.id);
                    if (clients[addr].size === 0) {
                        delete clients[addr];
                    }
                }
                delete clientAddresses[client.id];
                console.log("Clients:", clients);
            })
        });

        const fromBlock = await web3.eth.getBlockNumber(); // start listening from current block
        let contract = new web3Websocket.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address)

        contract.events.NewAssetDeposit({fromBlock}, async (error, event) => {
            if (error) return console.log(`Event error: ${error}`.red);

            let {user, assetAddress, amount} = event.returnValues;
            const asset = (await this.assetDescription(assetAddress)).symbol.toUpperCase();
            console.log(`New Deposit! ${amount} ${asset}. User: ${user}`.yellow.inverse);

            await saveTransactionHistory(this, user, asset, amount, "Deposit");
            await notifyClient(this, user, assetAddress, asset, amount);
        });

        contract.events.NewAssetWithdrawl({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 

            let { user, assetAddress, amount} = event.returnValues;
            const asset = (await this.assetDescription(assetAddress)).symbol.toUpperCase();
            console.log(`New Withdrawal! ${amount} ${asset}. User: ${user}`.yellow.inverse);

            await saveTransactionHistory(this, user, asset, amount, "Withdrawal");
            await notifyClient(this, user, assetAddress, asset, amount);
        });

        function money(amount, symbol) {
            return  Number((amount / 10**8).toFixed(8)) + ` ${symbol}`;
        }

        contract.events.NewTrade({fromBlock}, async (error, event) => {
            if (error) return console.log(`Event error`.red);

            let {buyer, seller, baseAsset, quoteAsset, filledAmount, amountQuote} = event.returnValues;
            const baseSymbol = (await this.assetDescription(baseAsset)).symbol.toUpperCase();
            const quoteSymbol = (await this.assetDescription(quoteAsset)).symbol.toUpperCase();

            console.log(`New Trade! ${money(filledAmount, baseSymbol)}/${money(amountQuote, quoteSymbol)} , Total:. Buyer: ${buyer}. Seller: ${seller}`.yellow.inverse);

            await notifyClient(this, buyer, baseAsset, baseSymbol, filledAmount);
            await notifyClient(this, buyer, quoteAsset, quoteSymbol, amountQuote);
            await notifyClient(this, seller, baseAsset, baseSymbol, filledAmount);
            await notifyClient(this, seller, quoteAsset, quoteSymbol, amountQuote);
        });

        function saveTransactionHistory(self, user, asset, amount, reason) {

            amount = amount / 10**8
            
            const history = {
                type: reason.toLowerCase(),
                asset: asset.toLowerCase(),
                amount,
                user
            };
            return History.create(history);
        }

        async function notifyClient(self, user, assetAddress, asset, amount) {
            // If there is a client connected with the user event address
            if (clients[user]){
                console.log("Notifying", user);
                const newWalletBalance = await self.getWalletBalance(assetAddress, user);
                const balances = await self.getContractBalances(user);
                const newBalance = balances[asset];
                io.to(user).emit('balanceChange',{
                    user, asset, assetAddress, amount, newBalance, newWalletBalance: String(newWalletBalance)})
            }

        }
        
    }
}

module.exports = {
    InfuraNode
};