// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var balances_api_pb = require('./balances_api_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_dex_grpc_integration_BalanceChangesResponse(arg) {
  if (!(arg instanceof balances_api_pb.BalanceChangesResponse)) {
    throw new Error('Expected argument of type dex.grpc.integration.BalanceChangesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dex_grpc_integration_BalanceChangesResponse(buffer_arg) {
  return balances_api_pb.BalanceChangesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var BalancesApiService = exports.BalancesApiService = {
  getBalanceChanges: {
    path: '/dex.grpc.integration.BalancesApi/GetBalanceChanges',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: balances_api_pb.BalanceChangesResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_dex_grpc_integration_BalanceChangesResponse,
    responseDeserialize: deserialize_dex_grpc_integration_BalanceChangesResponse,
  },
};

exports.BalancesApiClient = grpc.makeGenericClientConstructor(BalancesApiService);
