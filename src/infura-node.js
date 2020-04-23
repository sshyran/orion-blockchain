const Web3 = require("web3");
const WsWeb3 = require("./wsWeb3");
const web3 = new Web3("https://ropsten.infura.io/v3/e7e50056370b47e0b71bdbc746887727");
let web3Websocket;
const History = require("./models/history");
const _ = require("lodash");
const io = require('socket.io')(3002);

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
    usdt: "0xfC1CD13A7f126eFD823E373C4086F69beB8611C2"
};

const ethAssetAddress = "0x0000000000000000000000000000000000000000"; // ETH  "asset" address in balanaces

let clients = {};
let clientAddresses = {};
let fromBlock = 0;
let subscriptions = [];

function watchBlocks() {
    let timerId = null;
    subscriptions.push(web3Websocket.eth.subscribe('newBlockHeaders')
        .on('data', (blockHeader) => {
            fromBlock = blockHeader.number;
            console.log("New block:", fromBlock);
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(() => {
                web3Websocket.refreshProvider();
            }, 20000)
        }).on('error', (error) => {
            console.error("Error on newBlockHeaders:", error);
        }));
}


async function subscribeBalanceChanges() {

    if (!fromBlock) {
        fromBlock = await web3.eth.getBlockNumber(); // start listening from current block
    }

    console.log("Subscribe to BalanceChanges since block:", fromBlock);

    const contract = new web3Websocket.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address);

    subscriptions.push(
        contract.events.NewAssetDeposit({fromBlock}, async (error, event) => {
            if (error) return console.log(`Event error: ${error}`.red);

            let {user, assetAddress, amount} = event.returnValues;
            const asset = (await InfuraNode.assetDescription(assetAddress)).symbol.toUpperCase();
            console.log(`New Deposit! ${amount} ${asset}. User: ${user}`.yellow.inverse);

            await saveTransactionHistory(user, asset, amount, "Deposit");
            await notifyClient(user, assetAddress, asset, amount);
        }));

    subscriptions.push(
        contract.events.NewAssetWithdrawl({fromBlock}, async (error, event) => {
            if (error) return console.log(`Event error`.red);

            let {user, assetAddress, amount} = event.returnValues;
            const asset = (await InfuraNode.assetDescription(assetAddress)).symbol.toUpperCase();
            console.log(`New Withdrawal! ${amount} ${asset}. User: ${user}`.yellow.inverse);

            await saveTransactionHistory(user, asset, amount, "Withdrawal");
            await notifyClient(user, assetAddress, asset, amount);
        }));

    function money(amount, symbol) {
        return Number((amount / 10 ** 8).toFixed(8)) + ` ${symbol}`;
    }

    subscriptions.push(
        contract.events.NewTrade({fromBlock}, async (error, event) => {
            if (error) return console.log(`Event error`.red);

            let {buyer, seller, baseAsset, quoteAsset, filledAmount, amountQuote} = event.returnValues;
            const baseSymbol = (await InfuraNode.assetDescription(baseAsset)).symbol.toUpperCase();
            const quoteSymbol = (await InfuraNode.assetDescription(quoteAsset)).symbol.toUpperCase();

            console.log(`New Trade! ${money(filledAmount, baseSymbol)}/${money(amountQuote, quoteSymbol)} , Total:. Buyer: ${buyer}. Seller: ${seller}`.yellow.inverse);

            await notifyClient(buyer, baseAsset, baseSymbol, filledAmount);
            await notifyClient(buyer, quoteAsset, quoteSymbol, amountQuote);
            await notifyClient(seller, baseAsset, baseSymbol, filledAmount);
            await notifyClient(seller, quoteAsset, quoteSymbol, amountQuote);
        }));

    function saveTransactionHistory(user, asset, amount, reason) {

        amount = amount / 10 ** 8

        const history = {
            type: reason.toLowerCase(),
            asset: asset.toLowerCase(),
            amount,
            user
        };
        return History.create(history);
    }

    async function notifyClient(user, assetAddress, asset, amount) {
        // If there is a client connected with the user event address
        if (clients[user]) {
            console.log("Notifying", user);
            const newWalletBalance = await InfuraNode.getWalletBalance(assetAddress, user);
            const balances = await InfuraNode.getContractBalances(user);
            const newBalance = balances[asset];
            io.to(user).emit('balanceChange', {
                user, asset, assetAddress, amount, newBalance, newWalletBalance: String(newWalletBalance)
            })
        }

    }

}

function unsubscribe(){
    console.log("Unsubscribe from old subscriptions:", subscriptions.length)
    subscriptions.forEach(s => s.unsubscribe());
    subscriptions = [];
}

function subscribe(){
    subscribeBalanceChanges()
        .catch(error => {
            console.log("Error during subscribeBalanceChanges:", error);
        });
    watchBlocks();
}

class InfuraNode {

    static formatValue(value){
        return value
        // return value.toLocaleString('en-US', {
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 8
        // });
    }

    static async getWalletBalances(address) {

        let balanceEth = await InfuraNode.getWalletBalance(ethAssetAddress, address);
        let balanceWBTC = await InfuraNode.getWalletBalance(Tokens.wbtc, address);
        let balanceWXRP = await InfuraNode.getWalletBalance(Tokens.wxrp, address);
        let balanceUSDT = await InfuraNode.getWalletBalance(Tokens.usdt, address);

        return {
            'ETH': InfuraNode.formatValue(balanceEth),
            'WBTC': InfuraNode.formatValue(balanceWBTC),
            'WXRP': InfuraNode.formatValue(balanceWXRP),
            'USDT':  InfuraNode.formatValue(balanceUSDT)
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
            'ETH': InfuraNode.formatValue(balances[0]/10**8),
            'WBTC': InfuraNode.formatValue(balances[1]/10**8),
            'WXRP': InfuraNode.formatValue(balances[2]/10**8),
            'USDT': InfuraNode.formatValue(balances[3]/10**8),
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

    static async startWatching() {
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

        web3Websocket = new WsWeb3(
            "wss://ropsten.infura.io/ws/v3/e7e50056370b47e0b71bdbc746887727",
            subscribe,
            unsubscribe);
    }

}

module.exports = {
    InfuraNode
};