const Web3 = require("web3");
const BlockchainOrderModel = require("./models/blockchainOrder");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const hdProvider = new HDWalletProvider(
    process.env.MNEMOMIC,
    `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    2
);
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
const nonceTracker = new NonceTrackerSubprovider();
hdProvider.engine._providers.unshift(nonceTracker);
nonceTracker.setEngine(hdProvider.engine);

const web3 = new Web3(hdProvider);
const exchangeArtifact = require("../abis/Exchange.json");

const io = require('socket.io-client');
const Long = require('long');

let accounts, netId, exchange;


const wanAssetAddress = "0x0000000000000000000000000000000000000000"; // WAN  "asset" address in balanaces
const ERC20_ABI = require("../abis/erc20");

// CONVERT LONG TO BYTES
function longToBytes(long) {
    return web3.utils.bytesToHex(Long.fromNumber(long).toBytesBE());
}

// === GET ORDER HASH=== //
function hashOrder(orderInfo) {
    let message = web3.utils.soliditySha3(
        "0x03",
        orderInfo.senderAddress,
        orderInfo.matcherAddress,
        orderInfo.baseAsset,
        orderInfo.quoteAsset,
        orderInfo.matcherFeeAsset,
        longToBytes(orderInfo.amount),
        longToBytes(orderInfo.price),
        longToBytes(orderInfo.matcherFee),
        longToBytes(orderInfo.nonce),
        longToBytes(orderInfo.expiration),
        orderInfo.side === "buy" ? "0x00" : "0x01"
    );

    return message;
}

async function validateSignature(signature, orderInfo) {
    const message = hashOrder(orderInfo);
    return web3.eth.accounts.recover(message, signature);
}

// === GET SIGATURE OBJECT === //
function getSignatureObj(signature) {
    signature = signature.substr(2); //remove 0x
    const r = "0x" + signature.slice(0, 64);
    const s = "0x" + signature.slice(64, 128);
    let v = web3.utils.hexToNumber("0x" + signature.slice(128, 130));
    return { v, r, s };
}

async function doFillOrdersByMatcher(
    buyOrder,
    sellOrder,
    signature1,
    signature2,
    fillPrice,
    fillAmount
) {
    return exchange.methods
        .fillOrders(
            buyOrder,
            sellOrder,
            getSignatureObj(signature1),
            getSignatureObj(signature2),
            fillPrice,
            fillAmount
        )
        .send({ from: hdProvider.getAddress(), gas: 1e6 }); //matcher address is accounts 0
}


async function fillOrdersByMatcher(makerOrder, takerOrder) {
    const buyOrder = makerOrder.side === "buy" ? makerOrder : takerOrder;
    console.log("Buy Order Struct: \n", JSON.stringify(buyOrder, null, 2));
    const buySig = buyOrder.signature;
    console.log("Buy signature:", buySig);

    const sellOrder = makerOrder.side === "sell" ? makerOrder : takerOrder;
    console.log("Sell Order Struct: \n", JSON.stringify(sellOrder, null, 2));
    const sellSig = sellOrder.signature;
    console.log("Sell Signature:", sellSig);

    const fillAmount = takerOrder.amount;
    const fillPrice = takerOrder.price;

    console.log("Fill amount:", fillAmount);
    console.log("Fill price:", fillPrice);

    try {
        console.log("Nonce cache:", nonceTracker.nonceCache)
        const response = await doFillOrdersByMatcher(
            buyOrder,
            sellOrder,
            buySig,
            sellSig,
            fillPrice,
            fillAmount
        );

        console.log("\nTransaction successful? ", response.status);
        console.log("New Trade Event:\n", response.events.NewTrade.returnValues);
        return "FILLED";

    } catch (e) {
        console.log("Error occured during fillOrders", e);
        return "REJECTED";
    }
}

class ExchangeContract {
    static async setup() {
        netId = await web3.eth.net.getId();

        exchange = new web3.eth.Contract(
            exchangeArtifact.abi,
            exchangeArtifact.networks[netId].address
        );

        accounts = await web3.eth.getAccounts();
    }

    static async saveBlockchainOrder(order) {
        if (order.id) {
            order._id = order.id;
        } else {
            order._id = order.id = hashOrder(order);
        }
        return BlockchainOrderModel.create(order);
    }

    static async matchOrder(makerOrderId, counterOrder) {
        const makerOrder = await BlockchainOrderModel.findById(makerOrderId);

        const sender = await validateSignature(counterOrder.signature, counterOrder);
        return fillOrdersByMatcher(makerOrder, counterOrder);
    }
}
module.exports = {ExchangeContract}