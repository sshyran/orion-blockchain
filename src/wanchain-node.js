const axios = require('axios');
const { Assets} = require('./orion-matcher')
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

const WETHArtifact = require("../abis/WETH.json");
const WBTCArtifact = require("../abis/WBTC.json");
const exchangeArtifact = require("../abis//Exchange.json");

const Contracts = {
    exchange: new web3.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address),
    weth: new web3.eth.Contract(WETHArtifact.abi, WETHArtifact.networks["3"].address),
    wbtc: new web3.eth.Contract(WBTCArtifact.abi, WBTCArtifact.networks["3"].address)
}

const wanAssetAddress = "0x0000000000000000000000000000000000000000"; // WAN or ETH "asset" address in balanaces


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

}

module.exports = {
    WanchainNode
};
