const OrionSettings = {
    matcherUrl: 'https://demo.orionprotocol.io/matcher',
    orionUrl: 'https://demo.orionprotocol.io/backend',
};

const Assets = {
    BTC: '0x89A3e1494Bc3Db81dAdC893DEd7476d33D47dCBD',
    ETH: '0x46397994A7e1E926eA0DE95557A4806d38F10B0d',
    TUSD: '0x1423ceB28dac1416E1031ff2430FFd72efe37DFD',

    toSymbolAsset: function(asset) {
        switch (asset) {
            case '0x89A3e1494Bc3Db81dAdC893DEd7476d33D47dCBD':
                return 'BTC';
            case '0x46397994A7e1E926eA0DE95557A4806d38F10B0d':
                return 'ETH';
            case '0x1423ceB28dac1416E1031ff2430FFd72efe37DFD':
                return 'TUSD';
            default:
                return null;
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
                expirationTimestamp,
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
        this.expirationTimestamp = expirationTimestamp;
        this.signature = signature;
    }
}

class OrionMatcher {
    static matcherHttp() {
        return axios.create({
            baseURL: Matcher.matcherUrl
        });
    }

    static orionHttp() {
        return axios.create({
            baseURL: Matcher.orionUrl
        });
    }
    /**
     *
     * @param blockchainOrder: BlockchainOrder
     */
    static async submitToMatcher(blockchainOrder) {
        console.log("Submitting BlockchainOrder: " + JSON.stringify(blockchainOrder))

        return OrionMatcher.matcherHttp().post('/matcher/orderbook', OrionMatcher.toMatcherOrder(blockchainOrder))
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
            expiration: bo.expirationTimestamp,
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
    OrionSettings: OrionSettings,
    OrionOrder: OrionOrder,
    OrionMatcher: OrionMatcher,
    Assets: Assets
};
