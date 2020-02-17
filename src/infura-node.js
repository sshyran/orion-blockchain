const Web3 = require("web3");
const web3 = new Web3("https://ropsten.infura.io/v3/e7e50056370b47e0b71bdbc746887727");
const web3Websocket = new Web3(`wss://ropsten.infura.io/ws/v3/e7e50056370b47e0b71bdbc746887727`);
const History = require("./models/history");

require('colors');

// Artifacts
const WETHArtifact = require("../abis/WETH.json");
const WBTCArtifact = require("../abis/WBTC.json");
const exchangeArtifact = require("../abis/Exchange.json");

const ERC20_ABI = require("../abis/erc20");

const Contracts = {
    exchange: new web3.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address),
    weth: new web3.eth.Contract(WETHArtifact.abi, WETHArtifact.networks["3"].address),
    wbtc: new web3.eth.Contract(WBTCArtifact.abi, WBTCArtifact.networks["3"].address)
}

const ethAssetAddress = "0x0000000000000000000000000000000000000000"; // WAN  "asset" address in balanaces

class InfuraNode {

    static formatValue(value){
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8
        });
    }

    static async getWalletBalances(address) {

        let balanceEth = await this.getWalletBalance(ethAssetAddress, address)
        let balanceWETH =  await this.getWalletBalance(Contracts.weth._address, address)
        let balanceWBTC =  await this.getWalletBalance(Contracts.wbtc._address, address)

        return {
            'WAN': this.formatValue(balanceEth),
            'WETH': this.formatValue(balanceWETH),
            'WBTC': this.formatValue(balanceWBTC),
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
        const assets = [ethAssetAddress, Contracts.weth._address, Contracts.wbtc._address];
        let balances = await Contracts.exchange.methods.getBalances(assets, address).call();

        return {
            'WAN': this.formatValue(balances[0]/10**8),
            'WETH': this.formatValue(balances[1]/10**8),
            'WBTC': this.formatValue(balances[2]/10**8),
        }

    }

    static async assetDescription(assetAddress){
        if(assetAddress === ethAssetAddress) return {name: 'Ethchain', symbol: "WAN", decimals: 18}
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

        let clients ={};
        
        const io = require('socket.io')(3002);
        io.on('connection', client => {

            // Client suscribes to a specific address 
            client.on('clientAddress', address => {
                clients[address] = client.id;
                console.log(`Client ${client.id} suscribed to changes in address ${address}`);                
            });

            // Client joins all balance changes room
            client.on('getAllChanges', () => {               
                client.join('allChanges');
                console.log(`Client ${client.id} suscribed to all balance Changes`);                
            });

            //When client disconnects, delete that record from object
            client.on('disconnect', () => { 
                console.log("client disconnected"); 
                clients = _.omitBy(clients, (value, key) => value === client.id);
                console.log("Clients:", clients);
            })
        });

        // Geth command used to run geth: 
        // ./geth --ws --wsapi eth,net,admin,personal,eth --wsorigins="*" --rpc --testnet --rpcapi eth,net,admin,personal,eth console

        const fromBlock = await web3.eth.getBlockNumber(); // start listening from current block
        let contract = new web3Websocket.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address)

        contract.events.NewAssetDeposit({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error: ${error}`.red)

            let { user, assetAddress, amount} = event.returnValues;

            await notifyClient(this, user, assetAddress, amount, "Deposit");
        })

        contract.events.NewAssetWithdrawl({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 

            let { user, assetAddress, amount} = event.returnValues;

            await notifyClient(this, user, assetAddress, amount, "Withdrawl");

        })

        contract.events.NewTrade({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 

            let { buyer, seller, baseAsset, quoteAsset, filledAmount, amountQuote} = event.returnValues;

            await notifyClient(this, buyer, baseAsset, filledAmount, "Trade");
            await notifyClient(this, seller, quoteAsset, amountQuote, "Trade");

        })

        async function notifyClient(self, user, assetAddress, amount, reason){
            let asset;
            let description = await self.assetDescription(assetAddress);
            asset = description.symbol;
            amount = amount/(10**8); // because contract uses balances in 10 ^ 8 format
            let newWalletBalance = await self.getWalletBalance(assetAddress, user);

            console.log(`New ${reason}! ${amount} ${asset}. User: ${user}`.yellow.inverse);

            const history = {
                type: reason.toLowerCase(),
                asset: asset.toLowerCase(),
                amount,
                user
            }

            History.create(history)

            let balances = await self.getContractBalances(user);
            let newBalance = balances[asset];

            // If there is a client connected with the user event address
            if(clients[user]){
                io.to(clients[user]).emit('balanceChange',{ reason, user, asset, assetAddress, amount, newBalance, newWalletBalance:String(newWalletBalance)})
            }

             // Emit event to all clients in room "all"
            io.in('allChanges').emit('balanceChange',{ reason, user, asset, amount, assetAddress, newBalance, newWalletBalance:String(newWalletBalance)});

        }
        
    }
}

module.exports = {
    InfuraNode
};

// const subscription = web3Websocket.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
//     if (error) return console.error(error);
    
//     console.log('Successfully subscribed!', blockHeader);
// })
//     .on('data', (blockHeader) => {
//         console.log('data: ', blockHeader);
//     });

// web3.eth.getBalance("0x7F8e61f666043439572b1E2135aeE18b27c0662D")
// .then(console.log);