// package: dex.grpc.integration
// file: balances_api.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as balances_api_pb from "./balances_api_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IBalancesApiService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBalanceChanges: IBalancesApiService_IGetBalanceChanges;
}

interface IBalancesApiService_IGetBalanceChanges extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, balances_api_pb.BalanceChangesResponse> {
    path: string; // "/dex.grpc.integration.BalancesApi/GetBalanceChanges"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<balances_api_pb.BalanceChangesResponse>;
    responseDeserialize: grpc.deserialize<balances_api_pb.BalanceChangesResponse>;
}

export const BalancesApiService: IBalancesApiService;

export interface IBalancesApiServer {
    getBalanceChanges: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, balances_api_pb.BalanceChangesResponse>;
}

export interface IBalancesApiClient {
    getBalanceChanges(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<balances_api_pb.BalanceChangesResponse>;
    getBalanceChanges(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<balances_api_pb.BalanceChangesResponse>;
}

export class BalancesApiClient extends grpc.Client implements IBalancesApiClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getBalanceChanges(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<balances_api_pb.BalanceChangesResponse>;
    public getBalanceChanges(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<balances_api_pb.BalanceChangesResponse>;
}
