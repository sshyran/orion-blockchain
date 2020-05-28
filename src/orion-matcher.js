const axios = require('axios');

const OrionSettings = {
    matcherUrl: 'https://demo.orionprotocol.io/matcher',
    orionUrl: 'http://localhost:9090/backend',
};

const Assets = {
    BTC: "0x335123EB7029030805864805fC95f1AB16A64D61",
    ETH: "0x0000000000000000000000000000000000000000",
    XRP: "0x15a3Eb660823e0a3eF4D4A86EEC0d66f405Db515",
    USDT: "0xfC1CD13A7f126eFD823E373C4086F69beB8611C2",

    toSymbolAsset: function(asset) {
        switch (asset) {
            case this.BTC:
                return 'BTC';
            case this.ETH:
                return 'ETH';
            case this.XRP:
                return 'XRP';
            case this.USDT:
                return 'USDT';
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
            clientOrdId: bo.id,
            symbol: Assets.toSymbol(bo.baseAsset, bo.quoteAsset),
            side: bo.side,
            orderQty: OrionMatcher.toFloatBalance(bo.amount).toString(),
            price: OrionMatcher.toFloatBalance(bo.price).toString(),
            ordType: "LIMIT"
        }
    }

    /**
     *
     * @param trade:
     */
    static toOrionTrade(trade) {
        return {
            ordId: trade.ordId,
            qty: OrionMatcher.toFloatBalance(trade.amount).toString(),
            price: OrionMatcher.toFloatBalance(trade.price).toString(),
            status: trade.status,
            subOrdId: trade.subOrdId,
            tradeId: trade.tradeId
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
                console.log(error);
                throw new Error(error.response);
            });
    }

    static async submitTradeToOrion(trade) {
        const ornTrade = OrionMatcher.toOrionTrade(trade);
        console.log("Submitting Orn Trade: ", JSON.stringify(ornTrade));

        return OrionMatcher.orionHttp().post('/api/v1/trade', ornTrade)
            .then((res) => {
                return res.data;
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
