// package: dex.grpc.integration
// file: balances_api.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class BalanceChangesResponse extends jspb.Message { 
    clearBatchList(): void;
    getBatchList(): Array<BalanceChangesResponse.Record>;
    setBatchList(value: Array<BalanceChangesResponse.Record>): void;
    addBatch(value?: BalanceChangesResponse.Record, index?: number): BalanceChangesResponse.Record;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BalanceChangesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BalanceChangesResponse): BalanceChangesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BalanceChangesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BalanceChangesResponse;
    static deserializeBinaryFromReader(message: BalanceChangesResponse, reader: jspb.BinaryReader): BalanceChangesResponse;
}

export namespace BalanceChangesResponse {
    export type AsObject = {
        batchList: Array<BalanceChangesResponse.Record.AsObject>,
    }


    export class Record extends jspb.Message { 
        getAddress(): Uint8Array | string;
        getAddress_asU8(): Uint8Array;
        getAddress_asB64(): string;
        setAddress(value: Uint8Array | string): void;

        getAsset(): Uint8Array | string;
        getAsset_asU8(): Uint8Array;
        getAsset_asB64(): string;
        setAsset(value: Uint8Array | string): void;

        getBalance(): number;
        setBalance(value: number): void;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Record.AsObject;
        static toObject(includeInstance: boolean, msg: Record): Record.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Record, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Record;
        static deserializeBinaryFromReader(message: Record, reader: jspb.BinaryReader): Record;
    }

    export namespace Record {
        export type AsObject = {
            address: Uint8Array | string,
            asset: Uint8Array | string,
            balance: number,
        }
    }

}
