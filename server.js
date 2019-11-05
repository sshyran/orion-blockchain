const messages = require('./generated/blockchain_api_pb');
const services = require('./generated/blockchain_api_grpc_pb');
const balanceMessages = require('./generated/balances_api_pb');
const balanceServices = require('./generated/balances_api_grpc_pb');
const { GrpcServerStreamingMethod } = require('grpc-methods');
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");
const exchangeArtifact = require("./abis/Exchange.json");

const io = require('socket.io-client')


const wanAssetAddress = "0x0000000000000000000000000000000000000000"; // WAN  "asset" address in balanaces
const ERC20_ABI = require("./abis/erc20");

const grpc = require('grpc');

let accounts, netId, exchange;

async function setupContracts() {
    netId = await web3.eth.net.getId();

    exchange = new web3.eth.Contract(
        exchangeArtifact.abi,
        exchangeArtifact.networks[netId].address
    );

    accounts = await web3.eth.getAccounts();
}

function getStatuses(call) {
    const status = new messages.TransactionStatus();
    const txid = call.request.getTransactionIdsList();
    const txid1 = call.request.getTransactionIdsList_asB64();
    status.setId(new Uint8Array([21,31]));
    status.setStatus(1);
    status.setHeight(25);
    call.write(status);
    call.end();
}


function toBlockchainOrder(o) {
    return {
        senderAddress:  web3.utils.bytesToHex(o.getSenderPublicKey()),
        matcherAddress: web3.utils.bytesToHex(o.getMatcherPublicKey()),
        baseAsset: web3.utils.bytesToHex(o.getAssetPair().getAmountAssetId()),
        quoteAsset: web3.utils.bytesToHex(o.getAssetPair().getPriceAssetId()),
        matcherFeeAsset: web3.utils.bytesToHex(o.getMatcherFee().getAssetId()),
        amount: o.getAmount(),
        price: o.getPrice(),
        matcherFee: o.getMatcherFee().getAmount(),
        nonce: o.getTimestamp(),
        expiration: o.getExpiration(),
        side: o.getOrderSide() === 0 ? 'buy' : 'sell'
    }
}

// === FILL ORDERS ===
function getSignatureObj(signature) {
    signature = signature.substr(2); //remove 0x
    const r = "0x" + signature.slice(0, 64);
    const s = "0x" + signature.slice(64, 128);
    let v = web3.utils.hexToNumber("0x" + signature.slice(128, 130)); //gwan
    if (netId !== 3) v += 27; //ganache
    return { v, r, s };
}

async function fillOrdersByMatcher(
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
        .send({ from: accounts[0], gas: 1e6 }); //matcher address is accounts 0
}


async function broadcast(call, callback) {
    const r = call.request;

    console.log(r);
    const eData = r.getTransaction().getTransaction().getExchange();
    const buyOrder = toBlockchainOrder(eData.getOrdersList()[0]);
    console.log("Buy Order Struct: \n", JSON.stringify(buyOrder, null, 2));
    const buySig = web3.utils.bytesToHex(eData.getOrdersList()[0].getProofsList()[0]);
    console.log("Buy signature:", buySig);

    const sellOrder = toBlockchainOrder(eData.getOrdersList()[1]);
    console.log("Sell Order Struct: \n", JSON.stringify(sellOrder, null, 2));
    const sellSig = web3.utils.bytesToHex(eData.getOrdersList()[1].getProofsList()[0]);
    console.log("Sell Signature:", sellSig);

    const fillAmount = eData.getAmount();
    const fillPrice = eData.getPrice();

    console.log("Fill amount:", fillAmount);
    console.log("Fill price:", fillPrice);

    const resp = new messages.BroadcastResponse();
    try {
        let response = await fillOrdersByMatcher(
                buyOrder,
                sellOrder,
                buySig,
                sellSig,
                fillPrice,
                fillAmount
            )
        console.log("\nTransaction successful? ", response.status);
        console.log("New Trade Event:\n", response.events.NewTrade.returnValues);

        resp.setIsValid(response.status);
    } catch (e) {
        console.log("Error occured during fillOrders", e);
        resp.setIsValid(false);
    }

    callback(null, resp);
}

async function getAssetDetails(assetAddress){
    if(assetAddress === wanAssetAddress) return {name: 'Wanchain', symbol: "WAN", decimals: 18}
    const token = new web3.eth.Contract(ERC20_ABI, assetAddress)
    const name = await token.methods.name().call();
    const symbol = await token.methods.symbol().call();
    const decimals = await token.methods.decimals().call();

    return {name, symbol, decimals};
}

async function assetDescription(call, callback) {
    const resp = new messages.AssetDescriptionResponse();
    const desc = new messages.AssetDescription();
    const assetId = web3.utils.bytesToHex(call.request.getAssetId());

    let details = await getAssetDetails(assetId);

    // if (assetId.equals(Buffer.from('aF194e9f29EcA94D6C941cC0c2ff8385c38d72D3', 'hex'))) {
    //     desc.setName(Uint8Array.from(Buffer.from('ETH')));
    // } else {
    //     desc.setName(Uint8Array.from(Buffer.from('BTC')));
    // }
    desc.setName(Uint8Array.from(Buffer.from(details.symbol)));
    desc.setDecimals(8);
    desc.setHasScript(false);
    resp.setDescription(desc);
    callback(null, resp);
}

function isFeatureActivated(call, callback) {
    const resp = new messages.IsFeatureActivatedResponse();
    resp.setIsActivated(true);
    callback(null, resp);
}

function hasAssetScript(call, callback) {
    const assetId = call.request.getAssetId();
    const resp = new messages.HasScriptResponse();
    resp.setHas(false);
    callback(null, resp);
}

function runAssetScript(call, callback) {

}

function runAddressScript(call, callback) {

}

function hasAddressScript(call, callback) {
    const resp = new messages.HasScriptResponse();
    resp.setHas(false);
    callback(null, resp);
}


function buf2hex(buffer) {
    let hex = Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    return "0x" + hex;
}
  

async function spendableAssetBalance(call, callback) {
    const assetId = web3.utils.bytesToHex(call.request.getAssetId());
    const address = web3.utils.bytesToHex(call.request.getAddress());
    const resp = new messages.SpendableAssetBalanceResponse();

    let balance = await exchange.methods.getBalance(assetId, address).call();
    console.log("Spendable balance of address:", address, ",", assetId, "=", balance);
    resp.setBalance(50e8);

    callback(null, resp);
}

function forgedOrder(call, callback) {
    const resp = new messages.ForgedOrderResponse();
    resp.setIsForged(false);
    callback(null, resp);
}

// TODO: Where to get address
function getBalanceChanges(stream, address) {
    let socket = io.connect('http://localhost:3002');
    socket.emit('clientAddress', address);

    socket.on('balanceChange', ({user, asset, newBalance}) =>{
        console.log(data);
        b.setAddress(Buffer.from(user, "hex"));
        b.setAsset(Buffer.from(asset, "hex"));
        b.setBalance(newBalance);
        balances.addBatch(b);
        stream.write(balances);
    });
}

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
    setupContracts();

    const server = new grpc.Server({
        "grpc.keepalive_time_ms": 10000, // send keepalive ping every 10 second, default is 2 hours
        "grpc.keepalive_timeout_ms": 5000, // keepalive ping time out after 5 seconds, default is 20 seoncds
        "grpc.keepalive_permit_without_calls": 1, // allow keepalive pings when there's no gRPC calls
        "grpc.http2.max_pings_without_data": 0, // allow unlimited amount of keepalive pings without data
        "grpc.http2.min_time_between_pings_ms": 10000, // allow grpc pings from client every 10 seconds
        "grpc.http2.min_ping_interval_without_data_ms": 5000, // allow grpc pings from client without data every 5 seconds
    });
    server.addService(services.BlockchainApiService, {
        getStatuses: getStatuses,
        broadcast: broadcast,
        isFeatureActivated: isFeatureActivated,
        assetDescription: assetDescription,
        hasAssetScript: hasAssetScript,
        runAssetScript: runAssetScript,
        hasAddressScript: hasAddressScript,
        runAddressScript: runAddressScript,
        spendableAssetBalance: spendableAssetBalance,
        forgedOrder: forgedOrder

    });
    server.addService(balanceServices.BalancesApiService, {
        getBalanceChanges: getBalanceChanges,
    });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    return server;
}

if (require.main === module) {

    // If this is run as a script, start a server on an unused port
    const routeServer = getServer();
    routeServer.start();

}

exports.getServer = getServer;
