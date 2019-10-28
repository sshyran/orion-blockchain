const axios = require('axios');
const { Assets} = require('./orion-matcher')
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545"); // Wanchain Testnet running locally
const web3Websocket = new Web3(`ws://127.0.0.1:8546`);


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

const wanAssetAddress = "0x0000000000000000000000000000000000000000"; // WAN  "asset" address in balanaces


class WanchainNode {

    static async getWalletBalances(address) {

        let balanceWan = await web3.eth.getBalance(address);
        let balanceWETH = await Contracts.weth.methods.balanceOf(address).call();
        let balanceWBTC = await Contracts.wbtc.methods.balanceOf(address).call();

        return {
            'WAN': balanceWan.toString(),
            'WETH': balanceWETH.toString(),
            'WBTC': balanceWBTC.toString()
        }
    }

    static async getContractBalances(address) {
        const assets = [wanAssetAddress, Contracts.weth._address, Contracts.wbtc._address];
        let balances = await Contracts.exchange.methods.getBalances(assets, address).call();

        return {
            'WAN': balances[0].toString(),
            'WETH': balances[1].toString(),
            'WBTC': balances[2].toString()
        }
    }

    static async assetDescription(assetAddress){
        if(assetAddress === wanAssetAddress) return {name: 'Wanchain', symbol: "WAN", decimals: 18}
        const token = new web3.eth.Contract(ERC20_ABI, assetAddress)
        const name = await token.methods.name().call();
        const symbol = await token.methods.symbol().call();
        const decimals = await token.methods.decimals().call();

        return {name, symbol, decimals};
    }

    static async getWalletBalance(assetAddress, userAddress){
        if(assetAddress === wanAssetAddress){
            let wanBalance = await web3.eth.getBalance(userAddress);
            return web3.utils.fromWei(wanBalance.toString())
        }

        const token = new web3.eth.Contract(ERC20_ABI, assetAddress)
        const balance = await token.methods.balanceOf(userAddress).call();
        const decimals = await token.methods.decimals().call();
        
        return balance*10**(-decimals);
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

        
        const io = require('socket.io')(3002);
        io.on('connection', client => {
            console.log("New Client Connected");
            client.emit("contracts", Contracts)
            client.on('received', data => { console.log(data);});
            client.on('disconnect', () => { console.log("client disconnected") });
        });

        // Gwan command used to run gwan: 
        // ./gwan --ws --wsapi eth,net,admin,personal,wan --wsorigins="*" --rpc --testnet --rpcapi eth,net,admin,personal,wan

        const fromBlock = await web3.eth.getBlockNumber(); // start listening from current block
        let contract = new web3Websocket.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address)

        contract.events.NewAssetDeposit({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red)

            let { user, assetAddress, amount} = event.returnValues;

            let description = await this.assetDescription(assetAddress);
            let asset = description.symbol;
            amount = amount*10**(-description.decimals);

            let newWalletBalance = await this.getWalletBalance(assetAddress, user);
            

            console.log(`New Deposit! ${amount} ${asset} received from ${user}`.cyan.inverse);
            let balances = await this.getContractBalances(user);
            let newBalance = balances[asset]*10**(-description.decimals);

            io.emit('balanceChange', { reason:"Deposit", user, asset, amount, newBalance, newWalletBalance});

        })

        contract.events.NewAssetWithdrawl({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 

            let { user, assetAddress, amount} = event.returnValues;

            let asset;

            let description = await this.assetDescription(assetAddress);
            asset = description.symbol;
            amount = amount*10**(-description.decimals);

            let newWalletBalance = await this.getWalletBalance(assetAddress, user);

            console.log(`New Withdrawal! ${amount} ${asset} withdrew to ${user}`.yellow.inverse);
            let balances = await this.getContractBalances(user);
            let newBalance = balances[asset]*10**(-description.decimals);

            io.emit('balanceChange', { reason:"Withdrawal", user, asset, amount, newBalance, newWalletBalance});

        })

        
    }
    

}

module.exports = {
    WanchainNode
};
