// package: orion
// file: order.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class AssetPair extends jspb.Message { 
    getAmountAssetId(): Uint8Array | string;
    getAmountAssetId_asU8(): Uint8Array;
    getAmountAssetId_asB64(): string;
    setAmountAssetId(value: Uint8Array | string): void;

    getPriceAssetId(): Uint8Array | string;
    getPriceAssetId_asU8(): Uint8Array;
    getPriceAssetId_asB64(): string;
    setPriceAssetId(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssetPair.AsObject;
    static toObject(includeInstance: boolean, msg: AssetPair): AssetPair.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssetPair, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssetPair;
    static deserializeBinaryFromReader(message: AssetPair, reader: jspb.BinaryReader): AssetPair;
}

export namespace AssetPair {
    export type AsObject = {
        amountAssetId: Uint8Array | string,
        priceAssetId: Uint8Array | string,
    }
}

export class Amount extends jspb.Message { 
    getAssetId(): Uint8Array | string;
    getAssetId_asU8(): Uint8Array;
    getAssetId_asB64(): string;
    setAssetId(value: Uint8Array | string): void;

    getAmount(): number;
    setAmount(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Amount.AsObject;
    static toObject(includeInstance: boolean, msg: Amount): Amount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Amount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Amount;
    static deserializeBinaryFromReader(message: Amount, reader: jspb.BinaryReader): Amount;
}

export namespace Amount {
    export type AsObject = {
        assetId: Uint8Array | string,
        amount: number,
    }
}

export class Order extends jspb.Message { 
    getChainId(): number;
    setChainId(value: number): void;

    getSenderPublicKey(): Uint8Array | string;
    getSenderPublicKey_asU8(): Uint8Array;
    getSenderPublicKey_asB64(): string;
    setSenderPublicKey(value: Uint8Array | string): void;

    getMatcherPublicKey(): Uint8Array | string;
    getMatcherPublicKey_asU8(): Uint8Array;
    getMatcherPublicKey_asB64(): string;
    setMatcherPublicKey(value: Uint8Array | string): void;


    hasAssetPair(): boolean;
    clearAssetPair(): void;
    getAssetPair(): AssetPair | undefined;
    setAssetPair(value?: AssetPair): void;

    getOrderSide(): Order.Side;
    setOrderSide(value: Order.Side): void;

    getAmount(): number;
    setAmount(value: number): void;

    getPrice(): number;
    setPrice(value: number): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    getExpiration(): number;
    setExpiration(value: number): void;


    hasMatcherFee(): boolean;
    clearMatcherFee(): void;
    getMatcherFee(): Amount | undefined;
    setMatcherFee(value?: Amount): void;

    getVersion(): number;
    setVersion(value: number): void;

    clearProofsList(): void;
    getProofsList(): Array<Uint8Array | string>;
    getProofsList_asU8(): Array<Uint8Array>;
    getProofsList_asB64(): Array<string>;
    setProofsList(value: Array<Uint8Array | string>): void;
    addProofs(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Order.AsObject;
    static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Order;
    static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
    export type AsObject = {
        chainId: number,
        senderPublicKey: Uint8Array | string,
        matcherPublicKey: Uint8Array | string,
        assetPair?: AssetPair.AsObject,
        orderSide: Order.Side,
        amount: number,
        price: number,
        timestamp: number,
        expiration: number,
        matcherFee?: Amount.AsObject,
        version: number,
        proofsList: Array<Uint8Array | string>,
    }

    export enum Side {
    BUY = 0,
    SELL = 1,
    }

}

export class ExchangeTransactionData extends jspb.Message { 
    getAmount(): number;
    setAmount(value: number): void;

    getPrice(): number;
    setPrice(value: number): void;

    getBuyMatcherFee(): number;
    setBuyMatcherFee(value: number): void;

    getSellMatcherFee(): number;
    setSellMatcherFee(value: number): void;

    clearOrdersList(): void;
    getOrdersList(): Array<Order>;
    setOrdersList(value: Array<Order>): void;
    addOrders(value?: Order, index?: number): Order;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExchangeTransactionData.AsObject;
    static toObject(includeInstance: boolean, msg: ExchangeTransactionData): ExchangeTransactionData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExchangeTransactionData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExchangeTransactionData;
    static deserializeBinaryFromReader(message: ExchangeTransactionData, reader: jspb.BinaryReader): ExchangeTransactionData;
}

export namespace ExchangeTransactionData {
    export type AsObject = {
        amount: number,
        price: number,
        buyMatcherFee: number,
        sellMatcherFee: number,
        ordersList: Array<Order.AsObject>,
    }
}
