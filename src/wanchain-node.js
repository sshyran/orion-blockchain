const axios = require('axios');
const { Assets} = require('./orion-matcher')
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545"); // Wanchain Testnet running locally
const web3Websocket = new Web3(`ws://127.0.0.1:8546`);

const _ = require("lodash")


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

    static formatValue(value){
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8
        });
    }

    static async getWalletBalances(address) {

        let balanceWan = await this.getWalletBalance(wanAssetAddress, address)
        let balanceWETH =  await this.getWalletBalance(Contracts.weth._address, address)
        let balanceWBTC =  await this.getWalletBalance(Contracts.wbtc._address, address)

        return {
            'WAN': this.formatValue(balanceWan),
            'WETH': this.formatValue(balanceWETH),
            'WBTC': this.formatValue(balanceWBTC),
        }
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

    static async getContractBalances(address) {
        const assets = [wanAssetAddress, Contracts.weth._address, Contracts.wbtc._address];
        let balances = await Contracts.exchange.methods.getBalances(assets, address).call();

        return {
            'WAN': this.formatValue(balances[0]/10**8),
            'WETH': this.formatValue(balances[1]/10**8),
            'WBTC': this.formatValue(balances[2]/10**8),
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
           
            console.log("New Client Connected", client.id);

            client.on('clientAddress', address => { 
                console.log("Received address from client", client.id, address); 
                clients[address] = client.id;
                console.log("Clients:", clients);
            });

            client.on('disconnect', () => { 
                console.log("client disconnected"); 
                clients = _.omitBy(clients, (value, key) => value === client.id);
                console.log("Clients:", clients);
            })
        });

        // Gwan command used to run gwan: 
        // ./gwan --ws --wsapi eth,net,admin,personal,wan --wsorigins="*" --rpc --testnet --rpcapi eth,net,admin,personal,wan console

        const fromBlock = await web3.eth.getBlockNumber(); // start listening from current block
        let contract = new web3Websocket.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address)

        contract.events.NewAssetDeposit({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error: ${error}`.red)

            let { user, assetAddress, amount} = event.returnValues;

            let description = await this.assetDescription(assetAddress);
            let asset = description.symbol;

            amount = amount/(10**8);// because contract uses balances in 10 ^ 8 format


            let newWalletBalance = await this.getWalletBalance(assetAddress, user);
            

            console.log(`New Deposit! ${amount} ${asset} received from ${user}`.cyan.inverse);
            let balances = await this.getContractBalances(user);
            let newBalance = balances[asset]*10**(-description.decimals);

            // If there is a client connected with the user event address
            if(clients[user]){
                io.to(clients[user]).emit('balanceChange',{ reason:"Deposit", user, asset, amount, newBalance, newWalletBalance})
            }

            // io.emit('balanceChange', { reason:"Deposit", user, asset, amount, newBalance, newWalletBalance});

        })

        contract.events.NewAssetWithdrawl({fromBlock}, async (error, event) =>{
            if(error) return console.log(`Event error`.red) 

            let { user, assetAddress, amount} = event.returnValues;

            let asset;

            let description = await this.assetDescription(assetAddress);
            asset = description.symbol;

            amount = amount/(10**8); // because contract uses balances in 10 ^ 8 format

            let newWalletBalance = await this.getWalletBalance(assetAddress, user);

            console.log(`New Withdrawal! ${amount} ${asset} withdrew to ${user}`.yellow.inverse);
            let balances = await this.getContractBalances(user);
            let newBalance = balances[asset]*10**(-description.decimals);

            // If there is a client connected with the user event address
            if(clients[user]){
                io.to(clients[user]).emit('balanceChange',{ reason:"Withdrawal", user, asset, amount, newBalance, newWalletBalance})
            }

            io.emit('balanceChange', { reason:"Withdrawal", user, asset, amount, newBalance, newWalletBalance});

        })

        
    }
    

}

module.exports = {
    WanchainNode
};
