const express = require('express');
const app = express();
const { WanchainNode } = require('./src/wanchain-node');
const { OrionMatcher } = require('./src/orion-matcher');
const { getServer } = require('./server');

// Suscribe to deposits and withdrawl events
WanchainNode.watchBalanceChange();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


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

const routeServer = getServer();
routeServer.start();