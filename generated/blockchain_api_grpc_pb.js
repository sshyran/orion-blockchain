// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var blockchain_api_pb = require('./blockchain_api_pb.js');
var order_pb = require('./order_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_dex_grpc_integration_AssetDescriptionResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.AssetDescriptionResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.AssetDescriptionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_AssetDescriptionResponse(buffer_arg) {
  return blockchain_api_pb.AssetDescriptionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_AssetIdRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.AssetIdRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.AssetIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_AssetIdRequest(buffer_arg) {
  return blockchain_api_pb.AssetIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_BroadcastRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.BroadcastRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.BroadcastRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_BroadcastRequest(buffer_arg) {
  return blockchain_api_pb.BroadcastRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_BroadcastResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.BroadcastResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.BroadcastResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_BroadcastResponse(buffer_arg) {
  return blockchain_api_pb.BroadcastResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_ForgedOrderRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.ForgedOrderRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.ForgedOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_ForgedOrderRequest(buffer_arg) {
  return blockchain_api_pb.ForgedOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_ForgedOrderResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.ForgedOrderResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.ForgedOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_ForgedOrderResponse(buffer_arg) {
  return blockchain_api_pb.ForgedOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_HasAddressScriptRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.HasAddressScriptRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.HasAddressScriptRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_HasAddressScriptRequest(buffer_arg) {
  return blockchain_api_pb.HasAddressScriptRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_HasScriptResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.HasScriptResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.HasScriptResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_HasScriptResponse(buffer_arg) {
  return blockchain_api_pb.HasScriptResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_IsFeatureActivatedRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.IsFeatureActivatedRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.IsFeatureActivatedRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_IsFeatureActivatedRequest(buffer_arg) {
  return blockchain_api_pb.IsFeatureActivatedRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_IsFeatureActivatedResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.IsFeatureActivatedResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.IsFeatureActivatedResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_IsFeatureActivatedResponse(buffer_arg) {
  return blockchain_api_pb.IsFeatureActivatedResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_RunAddressScriptRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.RunAddressScriptRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.RunAddressScriptRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_RunAddressScriptRequest(buffer_arg) {
  return blockchain_api_pb.RunAddressScriptRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_RunAssetScriptRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.RunAssetScriptRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.RunAssetScriptRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_RunAssetScriptRequest(buffer_arg) {
  return blockchain_api_pb.RunAssetScriptRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_RunScriptResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.RunScriptResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.RunScriptResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_RunScriptResponse(buffer_arg) {
  return blockchain_api_pb.RunScriptResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_SpendableAssetBalanceRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.SpendableAssetBalanceRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.SpendableAssetBalanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_SpendableAssetBalanceRequest(buffer_arg) {
  return blockchain_api_pb.SpendableAssetBalanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_SpendableAssetBalanceResponse(arg) {
  if (!(arg instanceof blockchain_api_pb.SpendableAssetBalanceResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.SpendableAssetBalanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_SpendableAssetBalanceResponse(buffer_arg) {
  return blockchain_api_pb.SpendableAssetBalanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_TransactionStatus(arg) {
  if (!(arg instanceof blockchain_api_pb.TransactionStatus)) {
    throw new Error('Expected argument of type dex.grpc.integration.TransactionStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_TransactionStatus(buffer_arg) {
  return blockchain_api_pb.TransactionStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dex_grpc_integration_TransactionsByIdRequest(arg) {
  if (!(arg instanceof blockchain_api_pb.TransactionsByIdRequest)) {
    throw new Error('Expected argument of type dex.grpc.integration.TransactionsByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_TransactionsByIdRequest(buffer_arg) {
  return blockchain_api_pb.TransactionsByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var BlockchainApiService = exports.BlockchainApiService = {
  getStatuses: {
    path: '/dex.grpc.integration.BlockchainApi/GetStatuses',
    requestStream: false,
    responseStream: true,
    requestType: blockchain_api_pb.TransactionsByIdRequest,
    responseType: blockchain_api_pb.TransactionStatus,
    requestSerialize: serialize_dex_grpc_integration_TransactionsByIdRequest,
    requestDeserialize: deserialize_dex_grpc_integration_TransactionsByIdRequest,
    responseSerialize: serialize_dex_grpc_integration_TransactionStatus,
    responseDeserialize: deserialize_dex_grpc_integration_TransactionStatus,
  },
  broadcast: {
    path: '/dex.grpc.integration.BlockchainApi/Broadcast',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.BroadcastRequest,
    responseType: blockchain_api_pb.BroadcastResponse,
    requestSerialize: serialize_dex_grpc_integration_BroadcastRequest,
    requestDeserialize: deserialize_dex_grpc_integration_BroadcastRequest,
    responseSerialize: serialize_dex_grpc_integration_BroadcastResponse,
    responseDeserialize: deserialize_dex_grpc_integration_BroadcastResponse,
  },
  isFeatureActivated: {
    path: '/dex.grpc.integration.BlockchainApi/IsFeatureActivated',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.IsFeatureActivatedRequest,
    responseType: blockchain_api_pb.IsFeatureActivatedResponse,
    requestSerialize: serialize_dex_grpc_integration_IsFeatureActivatedRequest,
    requestDeserialize: deserialize_dex_grpc_integration_IsFeatureActivatedRequest,
    responseSerialize: serialize_dex_grpc_integration_IsFeatureActivatedResponse,
    responseDeserialize: deserialize_dex_grpc_integration_IsFeatureActivatedResponse,
  },
  assetDescription: {
    path: '/dex.grpc.integration.BlockchainApi/AssetDescription',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.AssetIdRequest,
    responseType: blockchain_api_pb.AssetDescriptionResponse,
    requestSerialize: serialize_dex_grpc_integration_AssetIdRequest,
    requestDeserialize: deserialize_dex_grpc_integration_AssetIdRequest,
    responseSerialize: serialize_dex_grpc_integration_AssetDescriptionResponse,
    responseDeserialize: deserialize_dex_grpc_integration_AssetDescriptionResponse,
  },
  hasAssetScript: {
    path: '/dex.grpc.integration.BlockchainApi/HasAssetScript',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.AssetIdRequest,
    responseType: blockchain_api_pb.HasScriptResponse,
    requestSerialize: serialize_dex_grpc_integration_AssetIdRequest,
    requestDeserialize: deserialize_dex_grpc_integration_AssetIdRequest,
    responseSerialize: serialize_dex_grpc_integration_HasScriptResponse,
    responseDeserialize: deserialize_dex_grpc_integration_HasScriptResponse,
  },
  runAssetScript: {
    path: '/dex.grpc.integration.BlockchainApi/RunAssetScript',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.RunAssetScriptRequest,
    responseType: blockchain_api_pb.RunScriptResponse,
    requestSerialize: serialize_dex_grpc_integration_RunAssetScriptRequest,
    requestDeserialize: deserialize_dex_grpc_integration_RunAssetScriptRequest,
    responseSerialize: serialize_dex_grpc_integration_RunScriptResponse,
    responseDeserialize: deserialize_dex_grpc_integration_RunScriptResponse,
  },
  hasAddressScript: {
    path: '/dex.grpc.integration.BlockchainApi/HasAddressScript',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.HasAddressScriptRequest,
    responseType: blockchain_api_pb.HasScriptResponse,
    requestSerialize: serialize_dex_grpc_integration_HasAddressScriptRequest,
    requestDeserialize: deserialize_dex_grpc_integration_HasAddressScriptRequest,
    responseSerialize: serialize_dex_grpc_integration_HasScriptResponse,
    responseDeserialize: deserialize_dex_grpc_integration_HasScriptResponse,
  },
  runAddressScript: {
    path: '/dex.grpc.integration.BlockchainApi/RunAddressScript',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.RunAddressScriptRequest,
    responseType: blockchain_api_pb.RunScriptResponse,
    requestSerialize: serialize_dex_grpc_integration_RunAddressScriptRequest,
    requestDeserialize: deserialize_dex_grpc_integration_RunAddressScriptRequest,
    responseSerialize: serialize_dex_grpc_integration_RunScriptResponse,
    responseDeserialize: deserialize_dex_grpc_integration_RunScriptResponse,
  },
  spendableAssetBalance: {
    path: '/dex.grpc.integration.BlockchainApi/SpendableAssetBalance',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.SpendableAssetBalanceRequest,
    responseType: blockchain_api_pb.SpendableAssetBalanceResponse,
    requestSerialize: serialize_dex_grpc_integration_SpendableAssetBalanceRequest,
    requestDeserialize: deserialize_dex_grpc_integration_SpendableAssetBalanceRequest,
    responseSerialize: serialize_dex_grpc_integration_SpendableAssetBalanceResponse,
    responseDeserialize: deserialize_dex_grpc_integration_SpendableAssetBalanceResponse,
  },
  forgedOrder: {
    path: '/dex.grpc.integration.BlockchainApi/ForgedOrder',
    requestStream: false,
    responseStream: false,
    requestType: blockchain_api_pb.ForgedOrderRequest,
    responseType: blockchain_api_pb.ForgedOrderResponse,
    requestSerialize: serialize_dex_grpc_integration_ForgedOrderRequest,
    requestDeserialize: deserialize_dex_grpc_integration_ForgedOrderRequest,
    responseSerialize: serialize_dex_grpc_integration_ForgedOrderResponse,
    responseDeserialize: deserialize_dex_grpc_integration_ForgedOrderResponse,
  },
};

exports.BlockchainApiClient = grpc.makeGenericClientConstructor(BlockchainApiService);
