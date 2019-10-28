const messages = require('./generated/blockchain_api_pb');
const services = require('./generated/blockchain_api_grpc_pb');
const balanceMessages = require('./generated/balances_api_pb');
const balanceServices = require('./generated/balances_api_grpc_pb');
const { GrpcServerStreamingMethod } = require('grpc-methods');
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");
const exchangeArtifact = require("./abis/Exchange.json");
const exchange = new web3.eth.Contract(exchangeArtifact.abi, exchangeArtifact.networks["3"].address);

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

function getSignatureObj(signature) {
    signature = web3.utils.bytesToHex(signature);
    signature = signature.substr(2); //remove 0x
    const r = "0x" + signature.slice(0, 64);
    const s = "0x" + signature.slice(64, 128);
    // const v = web3.utils.hexToNumber("0x" + signature.slice(128, 130)) + 27; // ganache
    const v = web3.utils.hexToNumber("0x" + signature.slice(128, 130)); // gwan

    return { r, s, v };
}

async function broadcast(call, callback) {
    const r = call.request;

    console.log(r);
    const eData = r.getTransaction().getTransaction().getExchange();
    const buyOrder = toBlockchainOrder(eData.getOrdersList()[0]);
    console.log("Buy Order Struct: \n", JSON.stringify(buyOrder, null, 2));
    const sellOrder = toBlockchainOrder(eData.getOrdersList()[1]);
    console.log("Sell Order Struct: \n", JSON.stringify(sellOrder, null, 2));

    const fillAmount = eData.getAmount();
    const fillPrice = eData.getPrice();

    let response = await exchange.methods
        .fillOrders(
            buyOrder,
            sellOrder,
            getSignatureObj(eData.getOrdersList()[0].getProofsList()[0]),
            getSignatureObj(eData.getOrdersList()[1].getProofsList()[0]),
            fillPrice,
            fillAmount
        )
        .send({ from: accounts[0], gas: 1e6 }); //matcher address is accounts 0

    console.log("\nTransaction successful? ", response.status);
    console.log("New Trade Event:\n", response.events.NewTrade.returnValues);

    const resp = new messages.BroadcastResponse();
    resp.setIsValid(true);
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
    const assetId = Buffer.from(call.request.getAssetId());

    let assetAddress = buf2hex(assetId);

    let details = await getAssetDetails(assetAddress);

    // if (assetId.equals(Buffer.from('aF194e9f29EcA94D6C941cC0c2ff8385c38d72D3', 'hex'))) {
    //     desc.setName(Uint8Array.from(Buffer.from('ETH')));
    // } else {
    //     desc.setName(Uint8Array.from(Buffer.from('BTC')));
    // }
    desc.setName(details.name);
    desc.setSymbol(details.symbol);
    desc.setDecimals(details.decimals);
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
    const assetId = call.request.getAssetId();
    const address = call.request.getAddress();
    const resp = new messages.SpendableAssetBalanceResponse();

    let assetAddress = buf2hex(assetId);
    
    let balance = await exchange.methods.getBalance(assetAddress, address).call();
    resp.setBalance(String(balance));

    callback(null, resp);
}

function forgedOrder(call, callback) {
    const resp = new messages.ForgedOrderResponse();
    resp.setIsForged(false);
    callback(null, resp);
}

function getBalanceChanges(stream) {
    let i = 0;
    const balances = new balanceMessages.BalanceChangesResponse();
    const b = new balanceMessages.BalanceChangesResponse.Record();
    b.setAddress(Buffer.from("89A3e1494Bc3Db81dAdC893DEd7476d33D47dCBD", "hex"));
    b.setAsset(Buffer.from("89A3e1494Bc3Db81dAdC893DEd7476d33D47dCBD", "hex"));
    b.setBalance(1000);
    balances.addBatch(b);
    stream.write(balances);
    let id = setInterval(() => {
        console.log('Infinite Loop Test interval n:', i++);
        const balances = new balanceMessages.BalanceChangesResponse();
        const b = new balanceMessages.BalanceChangesResponse.Record();
        b.setAddress(Buffer.from("89A3e1494Bc3Db81dAdC893DEd7476d33D47dCBD", "hex"));
        b.setAsset(Buffer.from("89A3e1494Bc3Db81dAdC893DEd7476d33D47dCBD", "hex"));
        b.setBalance(1000);
        balances.addBatch(b);
        if (i > 10) clearInterval(id);
        stream.write(balances);
    }, 2000);
}

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
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
    setupContracts();

    // If this is run as a script, start a server on an unused port
    const routeServer = getServer();
    routeServer.start();
}

exports.getServer = getServer;
