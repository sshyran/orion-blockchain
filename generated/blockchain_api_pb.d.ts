// package: dex.grpc.integration
// file: blockchain_api.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as order_pb from "./order_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class TransactionsByIdRequest extends jspb.Message { 
    clearTransactionIdsList(): void;
    getTransactionIdsList(): Array<Uint8Array | string>;
    getTransactionIdsList_asU8(): Array<Uint8Array>;
    getTransactionIdsList_asB64(): Array<string>;
    setTransactionIdsList(value: Array<Uint8Array | string>): void;
    addTransactionIds(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionsByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionsByIdRequest): TransactionsByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionsByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionsByIdRequest;
    static deserializeBinaryFromReader(message: TransactionsByIdRequest, reader: jspb.BinaryReader): TransactionsByIdRequest;
}

export namespace TransactionsByIdRequest {
    export type AsObject = {
        transactionIdsList: Array<Uint8Array | string>,
    }
}

export class AssetIdRequest extends jspb.Message { 
    getAssetId(): Uint8Array | string;
    getAssetId_asU8(): Uint8Array;
    getAssetId_asB64(): string;
    setAssetId(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssetIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AssetIdRequest): AssetIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssetIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssetIdRequest;
    static deserializeBinaryFromReader(message: AssetIdRequest, reader: jspb.BinaryReader): AssetIdRequest;
}

export namespace AssetIdRequest {
    export type AsObject = {
        assetId: Uint8Array | string,
    }
}

export class HasScriptResponse extends jspb.Message { 
    getHas(): boolean;
    setHas(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HasScriptResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HasScriptResponse): HasScriptResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HasScriptResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HasScriptResponse;
    static deserializeBinaryFromReader(message: HasScriptResponse, reader: jspb.BinaryReader): HasScriptResponse;
}

export namespace HasScriptResponse {
    export type AsObject = {
        has: boolean,
    }
}

export class RunScriptResponse extends jspb.Message { 

    hasWrongInput(): boolean;
    clearWrongInput(): void;
    getWrongInput(): string;
    setWrongInput(value: string): void;


    hasScriptError(): boolean;
    clearScriptError(): void;
    getScriptError(): string;
    setScriptError(value: string): void;


    hasUnexpectedResult(): boolean;
    clearUnexpectedResult(): void;
    getUnexpectedResult(): string;
    setUnexpectedResult(value: string): void;


    hasException(): boolean;
    clearException(): void;
    getException(): Exception | undefined;
    setException(value?: Exception): void;


    hasDenied(): boolean;
    clearDenied(): void;
    getDenied(): google_protobuf_empty_pb.Empty | undefined;
    setDenied(value?: google_protobuf_empty_pb.Empty): void;


    getResultCase(): RunScriptResponse.ResultCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunScriptResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RunScriptResponse): RunScriptResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunScriptResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunScriptResponse;
    static deserializeBinaryFromReader(message: RunScriptResponse, reader: jspb.BinaryReader): RunScriptResponse;
}

export namespace RunScriptResponse {
    export type AsObject = {
        wrongInput: string,
        scriptError: string,
        unexpectedResult: string,
        exception?: Exception.AsObject,
        denied?: google_protobuf_empty_pb.Empty.AsObject,
    }

    export enum ResultCase {
        RESULT_NOT_SET = 0,
    
    WRONG_INPUT = 1,

    SCRIPT_ERROR = 2,

    UNEXPECTED_RESULT = 3,

    EXCEPTION = 4,

    DENIED = 5,

    }

}

export class TransactionStatus extends jspb.Message { 
    getId(): Uint8Array | string;
    getId_asU8(): Uint8Array;
    getId_asB64(): string;
    setId(value: Uint8Array | string): void;

    getStatus(): TransactionStatus.Status;
    setStatus(value: TransactionStatus.Status): void;

    getHeight(): number;
    setHeight(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionStatus.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionStatus): TransactionStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionStatus;
    static deserializeBinaryFromReader(message: TransactionStatus, reader: jspb.BinaryReader): TransactionStatus;
}

export namespace TransactionStatus {
    export type AsObject = {
        id: Uint8Array | string,
        status: TransactionStatus.Status,
        height: number,
    }

    export enum Status {
    NOT_EXISTS = 0,
    UNCONFIRMED = 1,
    CONFIRMED = 2,
    }

}

export class BroadcastRequest extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): SignedExchangeTransaction | undefined;
    setTransaction(value?: SignedExchangeTransaction): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BroadcastRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BroadcastRequest): BroadcastRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BroadcastRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BroadcastRequest;
    static deserializeBinaryFromReader(message: BroadcastRequest, reader: jspb.BinaryReader): BroadcastRequest;
}

export namespace BroadcastRequest {
    export type AsObject = {
        transaction?: SignedExchangeTransaction.AsObject,
    }
}

export class BroadcastResponse extends jspb.Message { 
    getIsValid(): boolean;
    setIsValid(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BroadcastResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BroadcastResponse): BroadcastResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BroadcastResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BroadcastResponse;
    static deserializeBinaryFromReader(message: BroadcastResponse, reader: jspb.BinaryReader): BroadcastResponse;
}

export namespace BroadcastResponse {
    export type AsObject = {
        isValid: boolean,
    }
}

export class IsFeatureActivatedRequest extends jspb.Message { 
    getFeatureId(): number;
    setFeatureId(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IsFeatureActivatedRequest.AsObject;
    static toObject(includeInstance: boolean, msg: IsFeatureActivatedRequest): IsFeatureActivatedRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IsFeatureActivatedRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IsFeatureActivatedRequest;
    static deserializeBinaryFromReader(message: IsFeatureActivatedRequest, reader: jspb.BinaryReader): IsFeatureActivatedRequest;
}

export namespace IsFeatureActivatedRequest {
    export type AsObject = {
        featureId: number,
    }
}

export class IsFeatureActivatedResponse extends jspb.Message { 
    getIsActivated(): boolean;
    setIsActivated(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IsFeatureActivatedResponse.AsObject;
    static toObject(includeInstance: boolean, msg: IsFeatureActivatedResponse): IsFeatureActivatedResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IsFeatureActivatedResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IsFeatureActivatedResponse;
    static deserializeBinaryFromReader(message: IsFeatureActivatedResponse, reader: jspb.BinaryReader): IsFeatureActivatedResponse;
}

export namespace IsFeatureActivatedResponse {
    export type AsObject = {
        isActivated: boolean,
    }
}

export class AssetDescriptionResponse extends jspb.Message { 

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): AssetDescription | undefined;
    setDescription(value?: AssetDescription): void;


    getMaybeDescriptionCase(): AssetDescriptionResponse.MaybeDescriptionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssetDescriptionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AssetDescriptionResponse): AssetDescriptionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssetDescriptionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssetDescriptionResponse;
    static deserializeBinaryFromReader(message: AssetDescriptionResponse, reader: jspb.BinaryReader): AssetDescriptionResponse;
}

export namespace AssetDescriptionResponse {
    export type AsObject = {
        description?: AssetDescription.AsObject,
    }

    export enum MaybeDescriptionCase {
        MAYBEDESCRIPTION_NOT_SET = 0,
    
    DESCRIPTION = 1,

    }

}

export class AssetDescription extends jspb.Message { 
    getName(): Uint8Array | string;
    getName_asU8(): Uint8Array;
    getName_asB64(): string;
    setName(value: Uint8Array | string): void;

    getDecimals(): number;
    setDecimals(value: number): void;

    getHasScript(): boolean;
    setHasScript(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssetDescription.AsObject;
    static toObject(includeInstance: boolean, msg: AssetDescription): AssetDescription.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssetDescription, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssetDescription;
    static deserializeBinaryFromReader(message: AssetDescription, reader: jspb.BinaryReader): AssetDescription;
}

export namespace AssetDescription {
    export type AsObject = {
        name: Uint8Array | string,
        decimals: number,
        hasScript: boolean,
    }
}

export class RunAssetScriptRequest extends jspb.Message { 
    getAssetId(): Uint8Array | string;
    getAssetId_asU8(): Uint8Array;
    getAssetId_asB64(): string;
    setAssetId(value: Uint8Array | string): void;


    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): SignedExchangeTransaction | undefined;
    setTransaction(value?: SignedExchangeTransaction): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunAssetScriptRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunAssetScriptRequest): RunAssetScriptRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunAssetScriptRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunAssetScriptRequest;
    static deserializeBinaryFromReader(message: RunAssetScriptRequest, reader: jspb.BinaryReader): RunAssetScriptRequest;
}

export namespace RunAssetScriptRequest {
    export type AsObject = {
        assetId: Uint8Array | string,
        transaction?: SignedExchangeTransaction.AsObject,
    }
}

export class RunAddressScriptRequest extends jspb.Message { 
    getAddress(): Uint8Array | string;
    getAddress_asU8(): Uint8Array;
    getAddress_asB64(): string;
    setAddress(value: Uint8Array | string): void;


    hasOrder(): boolean;
    clearOrder(): void;
    getOrder(): order_pb.Order | undefined;
    setOrder(value?: order_pb.Order): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunAddressScriptRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunAddressScriptRequest): RunAddressScriptRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunAddressScriptRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunAddressScriptRequest;
    static deserializeBinaryFromReader(message: RunAddressScriptRequest, reader: jspb.BinaryReader): RunAddressScriptRequest;
}

export namespace RunAddressScriptRequest {
    export type AsObject = {
        address: Uint8Array | string,
        order?: order_pb.Order.AsObject,
    }
}

export class HasAddressScriptRequest extends jspb.Message { 
    getAddress(): Uint8Array | string;
    getAddress_asU8(): Uint8Array;
    getAddress_asB64(): string;
    setAddress(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HasAddressScriptRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HasAddressScriptRequest): HasAddressScriptRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HasAddressScriptRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HasAddressScriptRequest;
    static deserializeBinaryFromReader(message: HasAddressScriptRequest, reader: jspb.BinaryReader): HasAddressScriptRequest;
}

export namespace HasAddressScriptRequest {
    export type AsObject = {
        address: Uint8Array | string,
    }
}

export class SpendableAssetBalanceRequest extends jspb.Message { 
    getAddress(): Uint8Array | string;
    getAddress_asU8(): Uint8Array;
    getAddress_asB64(): string;
    setAddress(value: Uint8Array | string): void;

    getAssetId(): Uint8Array | string;
    getAssetId_asU8(): Uint8Array;
    getAssetId_asB64(): string;
    setAssetId(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpendableAssetBalanceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SpendableAssetBalanceRequest): SpendableAssetBalanceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SpendableAssetBalanceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpendableAssetBalanceRequest;
    static deserializeBinaryFromReader(message: SpendableAssetBalanceRequest, reader: jspb.BinaryReader): SpendableAssetBalanceRequest;
}

export namespace SpendableAssetBalanceRequest {
    export type AsObject = {
        address: Uint8Array | string,
        assetId: Uint8Array | string,
    }
}

export class SpendableAssetBalanceResponse extends jspb.Message { 
    getBalance(): number;
    setBalance(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpendableAssetBalanceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SpendableAssetBalanceResponse): SpendableAssetBalanceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SpendableAssetBalanceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpendableAssetBalanceResponse;
    static deserializeBinaryFromReader(message: SpendableAssetBalanceResponse, reader: jspb.BinaryReader): SpendableAssetBalanceResponse;
}

export namespace SpendableAssetBalanceResponse {
    export type AsObject = {
        balance: number,
    }
}

export class ForgedOrderRequest extends jspb.Message { 
    getOrderId(): Uint8Array | string;
    getOrderId_asU8(): Uint8Array;
    getOrderId_asB64(): string;
    setOrderId(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ForgedOrderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ForgedOrderRequest): ForgedOrderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ForgedOrderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ForgedOrderRequest;
    static deserializeBinaryFromReader(message: ForgedOrderRequest, reader: jspb.BinaryReader): ForgedOrderRequest;
}

export namespace ForgedOrderRequest {
    export type AsObject = {
        orderId: Uint8Array | string,
    }
}

export class ForgedOrderResponse extends jspb.Message { 
    getIsForged(): boolean;
    setIsForged(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ForgedOrderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ForgedOrderResponse): ForgedOrderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ForgedOrderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ForgedOrderResponse;
    static deserializeBinaryFromReader(message: ForgedOrderResponse, reader: jspb.BinaryReader): ForgedOrderResponse;
}

export namespace ForgedOrderResponse {
    export type AsObject = {
        isForged: boolean,
    }
}

export class Exception extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Exception.AsObject;
    static toObject(includeInstance: boolean, msg: Exception): Exception.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Exception, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Exception;
    static deserializeBinaryFromReader(message: Exception, reader: jspb.BinaryReader): Exception;
}

export namespace Exception {
    export type AsObject = {
        name: string,
        message: string,
    }
}

export class SignedExchangeTransaction extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): ExchangeTransaction | undefined;
    setTransaction(value?: ExchangeTransaction): void;

    clearProofsList(): void;
    getProofsList(): Array<Uint8Array | string>;
    getProofsList_asU8(): Array<Uint8Array>;
    getProofsList_asB64(): Array<string>;
    setProofsList(value: Array<Uint8Array | string>): void;
    addProofs(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignedExchangeTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: SignedExchangeTransaction): SignedExchangeTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignedExchangeTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignedExchangeTransaction;
    static deserializeBinaryFromReader(message: SignedExchangeTransaction, reader: jspb.BinaryReader): SignedExchangeTransaction;
}

export namespace SignedExchangeTransaction {
    export type AsObject = {
        transaction?: ExchangeTransaction.AsObject,
        proofsList: Array<Uint8Array | string>,
    }
}

export class ExchangeTransaction extends jspb.Message { 
    getChainId(): number;
    setChainId(value: number): void;

    getSenderPublicKey(): Uint8Array | string;
    getSenderPublicKey_asU8(): Uint8Array;
    getSenderPublicKey_asB64(): string;
    setSenderPublicKey(value: Uint8Array | string): void;


    hasFee(): boolean;
    clearFee(): void;
    getFee(): order_pb.Amount | undefined;
    setFee(value?: order_pb.Amount): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    getVersion(): number;
    setVersion(value: number): void;


    hasExchange(): boolean;
    clearExchange(): void;
    getExchange(): order_pb.ExchangeTransactionData | undefined;
    setExchange(value?: order_pb.ExchangeTransactionData): void;


    getDataCase(): ExchangeTransaction.DataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExchangeTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: ExchangeTransaction): ExchangeTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExchangeTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExchangeTransaction;
    static deserializeBinaryFromReader(message: ExchangeTransaction, reader: jspb.BinaryReader): ExchangeTransaction;
}

export namespace ExchangeTransaction {
    export type AsObject = {
        chainId: number,
        senderPublicKey: Uint8Array | string,
        fee?: order_pb.Amount.AsObject,
        timestamp: number,
        version: number,
        exchange?: order_pb.ExchangeTransactionData.AsObject,
    }

    export enum DataCase {
        DATA_NOT_SET = 0,
    
    EXCHANGE = 107,

    }

}
