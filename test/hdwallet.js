const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
require("dotenv").config();

const exchangeArtifact = require("../abis/Exchange.json");

let web3, exchange;

function setup() {
  let provider;

  if (process.env.MNEMONICS) {
    console.log("Using MNEMONICS");
    provider = new HDWalletProvider(
      process.env.MNEMONICS || "",
      `http://localhost:8545`,
      0,
      2
    );
  } else if (process.env.PRIVATE_KEY) {
    console.log("Using PRIVATE_KEY");
    provider = new HDWalletProvider(
      process.env.PRIVATE_KEY,
      `http://localhost:8545`
    );
  }

  web3 = new Web3(provider);

  exchange = new web3.eth.Contract(
    exchangeArtifact.abi,
    exchangeArtifact.networks["3"].address
  );
}

function getSignatureObj(signature) {
  signature = signature.substr(2); //remove 0x
  const r = "0x" + signature.slice(0, 64);
  const s = "0x" + signature.slice(64, 128);
  let v = web3.utils.hexToNumber("0x" + signature.slice(128, 130)); //gwan
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
  let accounts = await web3.eth.getAccounts();

  let response = await exchange.methods
    .fillOrders(
      buyOrder,
      sellOrder,
      getSignatureObj(signature1),
      getSignatureObj(signature2),
      fillPrice,
      fillAmount
    )
    .send({ from: accounts[0], gas: 1e6 }); //matcher address is accounts 0

  console.log(response);

  return response;
}

setup();

const buyOrder = {
  senderAddress: "0xF8a1775286DDDB8A0D2D35598D00F46873B4f8F6",
  matcherAddress: "0xB35d39BB41C69E4377A16C08EDA54999175c1cdD",
  baseAsset: "0x16D0770f8Dd8B3F3Ce75f39ce6A7626EDf7c2af4",
  quoteAsset: "0x092Ca292Ba7b104c551c89013F10e366203a4E5e",
  matcherFeeAsset: "0x16D0770f8Dd8B3F3Ce75f39ce6A7626EDf7c2af4",
  amount: 350000000,
  price: 2100000,
  matcherFee: 350000,
  nonce: 1571843003887,
  expiration: 1574348603887,
  side: "buy"
};
//Result from client script
const signature1 =
  "0xea938d6f50f33984570673c989c87183ef27d23610806e4f0e51451e837db4f308785470bccd4e53418cfc183a82758018dfe0e1499b859b8a9ae08dd1c62bb11c";

const sellOrder = {
  senderAddress: "0x3E6F7d8AAb3f0191943d8e175033A8B2C48de327",
  matcherAddress: "0xB35d39BB41C69E4377A16C08EDA54999175c1cdD",
  baseAsset: "0x16D0770f8Dd8B3F3Ce75f39ce6A7626EDf7c2af4",
  quoteAsset: "0x092Ca292Ba7b104c551c89013F10e366203a4E5e",
  matcherFeeAsset: "0x16D0770f8Dd8B3F3Ce75f39ce6A7626EDf7c2af4",
  amount: 150000000,
  price: 2000000,
  matcherFee: 150000,
  nonce: 1571843003887,
  expiration: 1574348603887,
  side: "sell"
};

//Result from client script
signature2 =
  "0x5cff86cd79b21cfd5d8cafdd6cba66a290967ab809a007cc49426d94e61918511fd1c095bd3f9f3e1df83e1777085bb3e43c8112e08defa400d70eddd983f1a81b";

fillOrdersByMatcher(
  buyOrder,
  sellOrder,
  signature1,
  signature2,
  sellOrder.price,
  Math.min(buyOrder.amount, sellOrder.amount)
);
