// package: dex.grpc.integration
// file: blockchain_api.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as blockchain_api_pb from "./blockchain_api_pb";
import * as order_pb from "./order_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IBlockchainApiService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getStatuses: IBlockchainApiService_IGetStatuses;
    broadcast: IBlockchainApiService_IBroadcast;
    isFeatureActivated: IBlockchainApiService_IIsFeatureActivated;
    assetDescription: IBlockchainApiService_IAssetDescription;
    hasAssetScript: IBlockchainApiService_IHasAssetScript;
    runAssetScript: IBlockchainApiService_IRunAssetScript;
    hasAddressScript: IBlockchainApiService_IHasAddressScript;
    runAddressScript: IBlockchainApiService_IRunAddressScript;
    spendableAssetBalance: IBlockchainApiService_ISpendableAssetBalance;
    forgedOrder: IBlockchainApiService_IForgedOrder;
}

interface IBlockchainApiService_IGetStatuses extends grpc.MethodDefinition<blockchain_api_pb.TransactionsByIdRequest, blockchain_api_pb.TransactionStatus> {
    path: string; // "/dex.grpc.integration.BlockchainApi/GetStatuses"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<blockchain_api_pb.TransactionsByIdRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.TransactionsByIdRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.TransactionStatus>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.TransactionStatus>;
}
interface IBlockchainApiService_IBroadcast extends grpc.MethodDefinition<blockchain_api_pb.BroadcastRequest, blockchain_api_pb.BroadcastResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/Broadcast"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.BroadcastRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.BroadcastRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.BroadcastResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.BroadcastResponse>;
}
interface IBlockchainApiService_IIsFeatureActivated extends grpc.MethodDefinition<blockchain_api_pb.IsFeatureActivatedRequest, blockchain_api_pb.IsFeatureActivatedResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/IsFeatureActivated"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.IsFeatureActivatedRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.IsFeatureActivatedRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.IsFeatureActivatedResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.IsFeatureActivatedResponse>;
}
interface IBlockchainApiService_IAssetDescription extends grpc.MethodDefinition<blockchain_api_pb.AssetIdRequest, blockchain_api_pb.AssetDescriptionResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/AssetDescription"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.AssetIdRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.AssetIdRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.AssetDescriptionResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.AssetDescriptionResponse>;
}
interface IBlockchainApiService_IHasAssetScript extends grpc.MethodDefinition<blockchain_api_pb.AssetIdRequest, blockchain_api_pb.HasScriptResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/HasAssetScript"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.AssetIdRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.AssetIdRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.HasScriptResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.HasScriptResponse>;
}
interface IBlockchainApiService_IRunAssetScript extends grpc.MethodDefinition<blockchain_api_pb.RunAssetScriptRequest, blockchain_api_pb.RunScriptResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/RunAssetScript"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.RunAssetScriptRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.RunAssetScriptRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.RunScriptResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.RunScriptResponse>;
}
interface IBlockchainApiService_IHasAddressScript extends grpc.MethodDefinition<blockchain_api_pb.HasAddressScriptRequest, blockchain_api_pb.HasScriptResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/HasAddressScript"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.HasAddressScriptRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.HasAddressScriptRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.HasScriptResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.HasScriptResponse>;
}
interface IBlockchainApiService_IRunAddressScript extends grpc.MethodDefinition<blockchain_api_pb.RunAddressScriptRequest, blockchain_api_pb.RunScriptResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/RunAddressScript"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.RunAddressScriptRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.RunAddressScriptRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.RunScriptResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.RunScriptResponse>;
}
interface IBlockchainApiService_ISpendableAssetBalance extends grpc.MethodDefinition<blockchain_api_pb.SpendableAssetBalanceRequest, blockchain_api_pb.SpendableAssetBalanceResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/SpendableAssetBalance"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.SpendableAssetBalanceRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.SpendableAssetBalanceRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.SpendableAssetBalanceResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.SpendableAssetBalanceResponse>;
}
interface IBlockchainApiService_IForgedOrder extends grpc.MethodDefinition<blockchain_api_pb.ForgedOrderRequest, blockchain_api_pb.ForgedOrderResponse> {
    path: string; // "/dex.grpc.integration.BlockchainApi/ForgedOrder"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<blockchain_api_pb.ForgedOrderRequest>;
    requestDeserialize: grpc.deserialize<blockchain_api_pb.ForgedOrderRequest>;
    responseSerialize: grpc.serialize<blockchain_api_pb.ForgedOrderResponse>;
    responseDeserialize: grpc.deserialize<blockchain_api_pb.ForgedOrderResponse>;
}

export const BlockchainApiService: IBlockchainApiService;

export interface IBlockchainApiServer {
    getStatuses: grpc.handleServerStreamingCall<blockchain_api_pb.TransactionsByIdRequest, blockchain_api_pb.TransactionStatus>;
    broadcast: grpc.handleUnaryCall<blockchain_api_pb.BroadcastRequest, blockchain_api_pb.BroadcastResponse>;
    isFeatureActivated: grpc.handleUnaryCall<blockchain_api_pb.IsFeatureActivatedRequest, blockchain_api_pb.IsFeatureActivatedResponse>;
    assetDescription: grpc.handleUnaryCall<blockchain_api_pb.AssetIdRequest, blockchain_api_pb.AssetDescriptionResponse>;
    hasAssetScript: grpc.handleUnaryCall<blockchain_api_pb.AssetIdRequest, blockchain_api_pb.HasScriptResponse>;
    runAssetScript: grpc.handleUnaryCall<blockchain_api_pb.RunAssetScriptRequest, blockchain_api_pb.RunScriptResponse>;
    hasAddressScript: grpc.handleUnaryCall<blockchain_api_pb.HasAddressScriptRequest, blockchain_api_pb.HasScriptResponse>;
    runAddressScript: grpc.handleUnaryCall<blockchain_api_pb.RunAddressScriptRequest, blockchain_api_pb.RunScriptResponse>;
    spendableAssetBalance: grpc.handleUnaryCall<blockchain_api_pb.SpendableAssetBalanceRequest, blockchain_api_pb.SpendableAssetBalanceResponse>;
    forgedOrder: grpc.handleUnaryCall<blockchain_api_pb.ForgedOrderRequest, blockchain_api_pb.ForgedOrderResponse>;
}

export interface IBlockchainApiClient {
    getStatuses(request: blockchain_api_pb.TransactionsByIdRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blockchain_api_pb.TransactionStatus>;
    getStatuses(request: blockchain_api_pb.TransactionsByIdRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blockchain_api_pb.TransactionStatus>;
    broadcast(request: blockchain_api_pb.BroadcastRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.BroadcastResponse) => void): grpc.ClientUnaryCall;
    broadcast(request: blockchain_api_pb.BroadcastRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.BroadcastResponse) => void): grpc.ClientUnaryCall;
    broadcast(request: blockchain_api_pb.BroadcastRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.BroadcastResponse) => void): grpc.ClientUnaryCall;
    isFeatureActivated(request: blockchain_api_pb.IsFeatureActivatedRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.IsFeatureActivatedResponse) => void): grpc.ClientUnaryCall;
    isFeatureActivated(request: blockchain_api_pb.IsFeatureActivatedRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.IsFeatureActivatedResponse) => void): grpc.ClientUnaryCall;
    isFeatureActivated(request: blockchain_api_pb.IsFeatureActivatedRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.IsFeatureActivatedResponse) => void): grpc.ClientUnaryCall;
    assetDescription(request: blockchain_api_pb.AssetIdRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.AssetDescriptionResponse) => void): grpc.ClientUnaryCall;
    assetDescription(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.AssetDescriptionResponse) => void): grpc.ClientUnaryCall;
    assetDescription(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.AssetDescriptionResponse) => void): grpc.ClientUnaryCall;
    hasAssetScript(request: blockchain_api_pb.AssetIdRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    hasAssetScript(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    hasAssetScript(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    runAssetScript(request: blockchain_api_pb.RunAssetScriptRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    runAssetScript(request: blockchain_api_pb.RunAssetScriptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    runAssetScript(request: blockchain_api_pb.RunAssetScriptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    hasAddressScript(request: blockchain_api_pb.HasAddressScriptRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    hasAddressScript(request: blockchain_api_pb.HasAddressScriptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    hasAddressScript(request: blockchain_api_pb.HasAddressScriptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    runAddressScript(request: blockchain_api_pb.RunAddressScriptRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    runAddressScript(request: blockchain_api_pb.RunAddressScriptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    runAddressScript(request: blockchain_api_pb.RunAddressScriptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    spendableAssetBalance(request: blockchain_api_pb.SpendableAssetBalanceRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.SpendableAssetBalanceResponse) => void): grpc.ClientUnaryCall;
    spendableAssetBalance(request: blockchain_api_pb.SpendableAssetBalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.SpendableAssetBalanceResponse) => void): grpc.ClientUnaryCall;
    spendableAssetBalance(request: blockchain_api_pb.SpendableAssetBalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.SpendableAssetBalanceResponse) => void): grpc.ClientUnaryCall;
    forgedOrder(request: blockchain_api_pb.ForgedOrderRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.ForgedOrderResponse) => void): grpc.ClientUnaryCall;
    forgedOrder(request: blockchain_api_pb.ForgedOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.ForgedOrderResponse) => void): grpc.ClientUnaryCall;
    forgedOrder(request: blockchain_api_pb.ForgedOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.ForgedOrderResponse) => void): grpc.ClientUnaryCall;
}

export class BlockchainApiClient extends grpc.Client implements IBlockchainApiClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getStatuses(request: blockchain_api_pb.TransactionsByIdRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blockchain_api_pb.TransactionStatus>;
    public getStatuses(request: blockchain_api_pb.TransactionsByIdRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blockchain_api_pb.TransactionStatus>;
    public broadcast(request: blockchain_api_pb.BroadcastRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.BroadcastResponse) => void): grpc.ClientUnaryCall;
    public broadcast(request: blockchain_api_pb.BroadcastRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.BroadcastResponse) => void): grpc.ClientUnaryCall;
    public broadcast(request: blockchain_api_pb.BroadcastRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.BroadcastResponse) => void): grpc.ClientUnaryCall;
    public isFeatureActivated(request: blockchain_api_pb.IsFeatureActivatedRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.IsFeatureActivatedResponse) => void): grpc.ClientUnaryCall;
    public isFeatureActivated(request: blockchain_api_pb.IsFeatureActivatedRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.IsFeatureActivatedResponse) => void): grpc.ClientUnaryCall;
    public isFeatureActivated(request: blockchain_api_pb.IsFeatureActivatedRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.IsFeatureActivatedResponse) => void): grpc.ClientUnaryCall;
    public assetDescription(request: blockchain_api_pb.AssetIdRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.AssetDescriptionResponse) => void): grpc.ClientUnaryCall;
    public assetDescription(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.AssetDescriptionResponse) => void): grpc.ClientUnaryCall;
    public assetDescription(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.AssetDescriptionResponse) => void): grpc.ClientUnaryCall;
    public hasAssetScript(request: blockchain_api_pb.AssetIdRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    public hasAssetScript(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    public hasAssetScript(request: blockchain_api_pb.AssetIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    public runAssetScript(request: blockchain_api_pb.RunAssetScriptRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    public runAssetScript(request: blockchain_api_pb.RunAssetScriptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    public runAssetScript(request: blockchain_api_pb.RunAssetScriptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    public hasAddressScript(request: blockchain_api_pb.HasAddressScriptRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    public hasAddressScript(request: blockchain_api_pb.HasAddressScriptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    public hasAddressScript(request: blockchain_api_pb.HasAddressScriptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.HasScriptResponse) => void): grpc.ClientUnaryCall;
    public runAddressScript(request: blockchain_api_pb.RunAddressScriptRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    public runAddressScript(request: blockchain_api_pb.RunAddressScriptRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    public runAddressScript(request: blockchain_api_pb.RunAddressScriptRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.RunScriptResponse) => void): grpc.ClientUnaryCall;
    public spendableAssetBalance(request: blockchain_api_pb.SpendableAssetBalanceRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.SpendableAssetBalanceResponse) => void): grpc.ClientUnaryCall;
    public spendableAssetBalance(request: blockchain_api_pb.SpendableAssetBalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.SpendableAssetBalanceResponse) => void): grpc.ClientUnaryCall;
    public spendableAssetBalance(request: blockchain_api_pb.SpendableAssetBalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.SpendableAssetBalanceResponse) => void): grpc.ClientUnaryCall;
    public forgedOrder(request: blockchain_api_pb.ForgedOrderRequest, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.ForgedOrderResponse) => void): grpc.ClientUnaryCall;
    public forgedOrder(request: blockchain_api_pb.ForgedOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.ForgedOrderResponse) => void): grpc.ClientUnaryCall;
    public forgedOrder(request: blockchain_api_pb.ForgedOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blockchain_api_pb.ForgedOrderResponse) => void): grpc.ClientUnaryCall;
}
