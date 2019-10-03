const axios = require('axios');
const { Assets} = require('./orion-matcher')
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8544");

class WanchainNode {

    static async getWalletBalances(address) {
        //TODO: Implement receiving wallet balance using web3 Wanchain provider
        return {
            'BTC': '0.015',
            'ETH': '3.25',
            'TUSD': '1500.36'
        }
    }

    static async getContractBalances(address) {
        //TODO: Implement receiving contract balance from Orion Exchange Smart contract
        return {
            'BTC': '0.015',
            'ETH': '3.25',
            'TUSD': '1500.36'
        }
    }

}

module.exports = {
    WanchainNode: WanchainNode,
};
