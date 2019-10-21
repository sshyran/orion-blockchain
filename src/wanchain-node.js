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
        const assets = [wanAssetAddress, Contracts.weth.address, Contracts.wbtc.address];
        let balances = await Contracts.exchange.methods.getBalances(assets, address).call();

        return {
            'WAN': balances[0].toString(),
            'WETH': balances[1].toString(),
            'WBTC': balances[2].toString()
        }
    }

    static addressToAssetSymbol(assetAddress){
        switch(assetAddress){
            case wanAssetAddress:
                return 'WAN'   
            case WETHArtifact.networks["3"].address: 
                return 'WETH'
            case WBTCArtifact.networks["3"].address: 
                return 'WBTC'
            default: return null
        }
    }

    static async watchBalanceChange (){
        const fromBlock = await web3.eth.getBlockNumber(); // start listening from current block
        let contract = new web3Websocket.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address)
        contract.events.NewAssetDeposit({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 
            const{ user, assetAddress} = event.returnValues;
            const asset = this.addressToAssetSymbol(assetAddress);
            console.log(`New ${asset} Deposit Received from ${user}`.cyan.inverse);
            let balances = await this.getContractBalances(user)
            console.log('Updated user contract balances:', balances);
        })

        contract.events.NewAssetWithdrawl({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 
            const{ user, assetAddress} = event.returnValues;
            const asset = this.addressToAssetSymbol(assetAddress);
            console.log(`New ${asset} Withdrawl to ${user}`.yellow.inverse);
            let balances = await this.getContractBalances(user)
            console.log('Updated user contract balances:', balances);
        })

        
    }
    

}

module.exports = {
    WanchainNode
};
