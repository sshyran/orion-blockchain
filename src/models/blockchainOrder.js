const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockchainOrderSchema = new Schema(
    {
        _id: String,
        senderAddress: String,
        matcherAddress: String,
        baseAsset: String,
        quoteAsset: String,
        side: String,
        amount: Number,
        price: Number,
        matcherFee: Number,
        matcherFeeAsset: String,
        nonce: Number,
        expiration: Number,
        signature: String
    }
);

module.exports = mongoose.model("BlockchainOrder", blockchainOrderSchema);
