require("dotenv").config();

const express = require('express');
const app = express();
const { WanchainNode } = require('./src/wanchain-node');
const { InfuraNode } = require('./src/infura-node');
const { OrionMatcher } = require('./src/orion-matcher');
const { getServer } = require('./server');
const mongoose = require('mongoose');
const History = require('./src/models/history')
const Web3 = require("web3");
const web3 = new Web3()

// Suscribe to deposits and withdrawl events
// WanchainNode.watchBalanceChange();
InfuraNode.watchBalanceChange();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// -------------------------- Wanchain ----------------------------------------
/**
 * {
 *     "BTC": [
 *         "0.2 5, // Wallet Balance
 *         0.15, // Contract Balance
 *         0.1, // Reserved Balance in open orders
 *     },
 *     "ETH": ["25.1561", "5.09", "0"]
 * }
 */
app.get('/api/balance/:address', async (req, res) => {
    const address = req.params.address;

    // Get wallet balances from Wanchain node
    const walletBalances = await WanchainNode.getWalletBalances(address);
    // Get contract balance for that address
    const contractbalances = await WanchainNode.getContractBalances(address);

    // TODO: Reserved balance from Orion Matcher
    // const contractbalances = await WanchainNode.getBalances(req.params.address);

    res.status(200).send({walletBalances, contractbalances});
});

app.get('/api/description/:assetAddress', async (req, res) => {
    const assetAddress = req.params.assetAddress;
    const description = await WanchainNode.assetDescription(assetAddress);
    res.status(200).send({...description});
})

app.get('/api/balanceChanges/:address', async (req, res) => {
    const address = req.params.address;
    const changeEvents = await WanchainNode.getBalanceChanges(address);
    res.status(200).send({...changeEvents});
})

//------------------------- Ethereum ------------------------------------------------

app.get('/api/eth/balance/:address', async (req, res) => {
    const address = req.params.address;

    // Get wallet balances from Ethereum node
    const walletBalances = await InfuraNode.getWalletBalances(address);
    // Get contract balance for that address
    const contractBalances = await InfuraNode.getContractBalances(address);

    // TODO: Reserved balance from Orion Matcher
    // const contractBalances = await InfuraNode.getBalances(req.params.address);

    res.status(200).send({walletBalances, contractBalances});
});

app.get('/api/eth/description/:assetAddress', async (req, res) => {
    const assetAddress = req.params.assetAddress;
    const description = await InfuraNode.assetDescription(assetAddress);
    res.status(200).send({...description});
})

app.get('/api/eth/balanceChanges/:address', async (req, res) => {
    const address = req.params.address;
    const changeEvents = await InfuraNode.getBalanceChanges(address);
    res.status(200).send({...changeEvents});
})

// -------------------------------------------------------------------------------------
app.get('/api/history/:address', async (req, res) => {
    const { address } = req.params;
    const histories = await History.find({ user: address }, 'type asset amount user created_at').exec()
    res.status(200).send(histories);
})

app.post('/api/order', async (req, res) => {
    const order = req.body;

    try {
        const result1 = await OrionMatcher.submitToMatcher(order);
        const result2 = await OrionMatcher.submitToOrion(order);
        res.send(result2);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send({code: 1000, msg: error.message});
    }
});

app.listen(3001, function () {
    console.log('Orion-Wanchain app listening on http://localhost:3001/');
});

// Database --------------

mongoose.connect(process.env.DB_URI, {  
    auth: {authSource: process.env.DB_AUTH},
    useUnifiedTopology: true, 
    useNewUrlParser: true 
}, (err, res) => {
	if (err) throw err;

	console.log('Database ONLINE' + ' - ' + new Date().toLocaleString());
});

// const routeServer = getServer();
// routeServer.start();