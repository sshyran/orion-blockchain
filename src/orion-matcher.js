const axios = require('axios');
const WETHArtifact = require("../abis/WETH.json");
const WBTCArtifact = require("../abis/WBTC.json");

const OrionSettings = {
    matcherUrl: 'https://demo.orionprotocol.io/matcher',
    orionUrl: 'https://demo.orionprotocol.io/backend',
};

const Assets = {
    BTC: WBTCArtifact.networks["3"].address,
    ETH: "0x0000000000000000000000000000000000000000",

    toSymbolAsset: function(asset) {
        switch (asset) {
            case this.BTC:
                return 'BTC';
            case this.ETH:
                return 'ETH';
            default:
                return 'BTC';
        }
    },
    toSymbol: function(baseAsset, quoteAsset) {
        return this.toSymbolAsset(baseAsset) + '-' + this.toSymbolAsset(quoteAsset)
    }
};

class BlockchainOrder {
    constructor(senderAddress,
                matcherAddress,
                baseAsset,
                quoteAsset,
                side,
                amount,
                price,
                matcherFee,
                matcherFeeAsset,
                nonce,
                expiration,
                signature) {
        this.senderAddress = senderAddress;
        this.matcherAddress = matcherAddress;
        this.baseAsset = baseAsset;
        this.quoteAsset = quoteAsset;
        this.side = side;
        this.amount = amount;
        this.price = price;
        this.matcherFee = matcherFee;
        this.matcherFeeAsset = matcherFeeAsset;
        this.nonce = nonce;
        this.expiration = expiration;
        this.signature = signature;
    }
}

class OrionMatcher {
    static matcherHttp() {
        return axios.create({
            baseURL: OrionSettings.matcherUrl
        });
    }

    static orionHttp() {
        return axios.create({
            baseURL: OrionSettings.orionUrl
        });
    }
    /**
     *
     * @param blockchainOrder: BlockchainOrder
     */
    static async submitToMatcher(blockchainOrder) {
        const matcherOrder = OrionMatcher.toMatcherOrder(blockchainOrder);
        console.log("Submitting MatcherOrder: " + JSON.stringify(matcherOrder));

        return OrionMatcher.matcherHttp().post('/orderbook', matcherOrder)
            .then((res) => {
                console.log(res.data);
                return true;
            })
            .catch(error => {
                console.log(error.response.data);
                throw new Error(error.response.data.message);
            });
    }

    /**
     *
     * @param bo: BlockchainOrder
     */
    static toMatcherOrder(bo) {
        return {
            version: 3,
            senderPublicKey: bo.senderAddress,
            matcherPublicKey: bo.matcherAddress,
            orderType: bo.side,
            assetPair: {
                amountAsset: bo.baseAsset,
                priceAsset: bo.quoteAsset,
            },
            price: bo.price,
            amount: bo.amount,
            timestamp: bo.nonce,
            expiration: bo.expiration,
            matcherFee: bo.matcherFee,
            matcherFeeAssetId: bo.matcherFeeAsset,
            proofs: [bo.signature]
        }
    }

    static toFloatBalance(bal, decimals = 8) {
        return Number((Number(bal) / Math.pow(10, decimals)).toFixed(decimals));
    }

    /**
     *
     * @param bo: BlockchainOrder
     */
    static toOrionOrder(bo) {
        return {
            clientId: bo.senderAddress,
            symbol: Assets.toSymbol(bo.baseAsset, bo.quoteAsset),
            side: bo.side,
            orderQty: OrionMatcher.toFloatBalance(bo.amount).toString(),
            price: OrionMatcher.toFloatBalance(bo.price).toString(),
            ordType: "LIMIT"
        }
    }

    static async submitToOrion(blockchainOrder) {
        const orionOrder = this.toOrionOrder(blockchainOrder);
        console.log("Submitting OrionOrder: ", JSON.stringify(orionOrder));

        return OrionMatcher.orionHttp().post('/api/v1/order', orionOrder)
            .then((res) => {
                console.log(res.data);
                return orionOrder;
            })
            .catch(error => {
                console.log(error.response.data);
                throw new Error(error.response.data);
            });
    }
}

module.exports = {
    OrionSettings,
    // OrionOrder: OrionOrder,
    OrionMatcher,
    Assets
};
