/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.orion.Amount', null, global);
goog.exportSymbol('proto.orion.AssetPair', null, global);
goog.exportSymbol('proto.orion.ExchangeTransactionData', null, global);
goog.exportSymbol('proto.orion.Order', null, global);
goog.exportSymbol('proto.orion.Order.Side', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orion.AssetPair = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orion.AssetPair, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.orion.AssetPair.displayName = 'proto.orion.AssetPair';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orion.AssetPair.prototype.toObject = function(opt_includeInstance) {
  return proto.orion.AssetPair.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orion.AssetPair} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.AssetPair.toObject = function(includeInstance, msg) {
  var f, obj = {
    amountAssetId: msg.getAmountAssetId_asB64(),
    priceAssetId: msg.getPriceAssetId_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orion.AssetPair}
 */
proto.orion.AssetPair.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orion.AssetPair;
  return proto.orion.AssetPair.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orion.AssetPair} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orion.AssetPair}
 */
proto.orion.AssetPair.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAmountAssetId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPriceAssetId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orion.AssetPair.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orion.AssetPair.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orion.AssetPair} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.AssetPair.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmountAssetId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getPriceAssetId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes amount_asset_id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.orion.AssetPair.prototype.getAmountAssetId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes amount_asset_id = 1;
 * This is a type-conversion wrapper around `getAmountAssetId()`
 * @return {string}
 */
proto.orion.AssetPair.prototype.getAmountAssetId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAmountAssetId()));
};


/**
 * optional bytes amount_asset_id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAmountAssetId()`
 * @return {!Uint8Array}
 */
proto.orion.AssetPair.prototype.getAmountAssetId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAmountAssetId()));
};


/** @param {!(string|Uint8Array)} value */
proto.orion.AssetPair.prototype.setAmountAssetId = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes price_asset_id = 2;
 * @return {!(string|Uint8Array)}
 */
proto.orion.AssetPair.prototype.getPriceAssetId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes price_asset_id = 2;
 * This is a type-conversion wrapper around `getPriceAssetId()`
 * @return {string}
 */
proto.orion.AssetPair.prototype.getPriceAssetId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPriceAssetId()));
};


/**
 * optional bytes price_asset_id = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPriceAssetId()`
 * @return {!Uint8Array}
 */
proto.orion.AssetPair.prototype.getPriceAssetId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPriceAssetId()));
};


/** @param {!(string|Uint8Array)} value */
proto.orion.AssetPair.prototype.setPriceAssetId = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orion.Amount = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orion.Amount, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.orion.Amount.displayName = 'proto.orion.Amount';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orion.Amount.prototype.toObject = function(opt_includeInstance) {
  return proto.orion.Amount.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orion.Amount} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.Amount.toObject = function(includeInstance, msg) {
  var f, obj = {
    assetId: msg.getAssetId_asB64(),
    amount: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orion.Amount}
 */
proto.orion.Amount.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orion.Amount;
  return proto.orion.Amount.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orion.Amount} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orion.Amount}
 */
proto.orion.Amount.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAssetId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orion.Amount.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orion.Amount.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orion.Amount} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.Amount.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAssetId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional bytes asset_id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.orion.Amount.prototype.getAssetId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes asset_id = 1;
 * This is a type-conversion wrapper around `getAssetId()`
 * @return {string}
 */
proto.orion.Amount.prototype.getAssetId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAssetId()));
};


/**
 * optional bytes asset_id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAssetId()`
 * @return {!Uint8Array}
 */
proto.orion.Amount.prototype.getAssetId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAssetId()));
};


/** @param {!(string|Uint8Array)} value */
proto.orion.Amount.prototype.setAssetId = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 amount = 2;
 * @return {number}
 */
proto.orion.Amount.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.orion.Amount.prototype.setAmount = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orion.Order = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.orion.Order.repeatedFields_, null);
};
goog.inherits(proto.orion.Order, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.orion.Order.displayName = 'proto.orion.Order';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.orion.Order.repeatedFields_ = [12];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orion.Order.prototype.toObject = function(opt_includeInstance) {
  return proto.orion.Order.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orion.Order} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.Order.toObject = function(includeInstance, msg) {
  var f, obj = {
    chainId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    senderPublicKey: msg.getSenderPublicKey_asB64(),
    matcherPublicKey: msg.getMatcherPublicKey_asB64(),
    assetPair: (f = msg.getAssetPair()) && proto.orion.AssetPair.toObject(includeInstance, f),
    orderSide: jspb.Message.getFieldWithDefault(msg, 5, 0),
    amount: jspb.Message.getFieldWithDefault(msg, 6, 0),
    price: jspb.Message.getFieldWithDefault(msg, 7, 0),
    timestamp: jspb.Message.getFieldWithDefault(msg, 8, 0),
    expiration: jspb.Message.getFieldWithDefault(msg, 9, 0),
    matcherFee: (f = msg.getMatcherFee()) && proto.orion.Amount.toObject(includeInstance, f),
    version: jspb.Message.getFieldWithDefault(msg, 11, 0),
    proofsList: msg.getProofsList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orion.Order}
 */
proto.orion.Order.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orion.Order;
  return proto.orion.Order.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orion.Order} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orion.Order}
 */
proto.orion.Order.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setChainId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSenderPublicKey(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMatcherPublicKey(value);
      break;
    case 4:
      var value = new proto.orion.AssetPair;
      reader.readMessage(value,proto.orion.AssetPair.deserializeBinaryFromReader);
      msg.setAssetPair(value);
      break;
    case 5:
      var value = /** @type {!proto.orion.Order.Side} */ (reader.readEnum());
      msg.setOrderSide(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAmount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setPrice(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpiration(value);
      break;
    case 10:
      var value = new proto.orion.Amount;
      reader.readMessage(value,proto.orion.Amount.deserializeBinaryFromReader);
      msg.setMatcherFee(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    case 12:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addProofs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orion.Order.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orion.Order.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orion.Order} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.Order.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getChainId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getSenderPublicKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getMatcherPublicKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getAssetPair();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.orion.AssetPair.serializeBinaryToWriter
    );
  }
  f = message.getOrderSide();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getPrice();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getExpiration();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getMatcherFee();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.orion.Amount.serializeBinaryToWriter
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getProofsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      12,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.orion.Order.Side = {
  BUY: 0,
  SELL: 1
};

/**
 * optional int32 chain_id = 1;
 * @return {number}
 */
proto.orion.Order.prototype.getChainId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.orion.Order.prototype.setChainId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes sender_public_key = 2;
 * @return {!(string|Uint8Array)}
 */
proto.orion.Order.prototype.getSenderPublicKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes sender_public_key = 2;
 * This is a type-conversion wrapper around `getSenderPublicKey()`
 * @return {string}
 */
proto.orion.Order.prototype.getSenderPublicKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSenderPublicKey()));
};


/**
 * optional bytes sender_public_key = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSenderPublicKey()`
 * @return {!Uint8Array}
 */
proto.orion.Order.prototype.getSenderPublicKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSenderPublicKey()));
};


/** @param {!(string|Uint8Array)} value */
proto.orion.Order.prototype.setSenderPublicKey = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes matcher_public_key = 3;
 * @return {!(string|Uint8Array)}
 */
proto.orion.Order.prototype.getMatcherPublicKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes matcher_public_key = 3;
 * This is a type-conversion wrapper around `getMatcherPublicKey()`
 * @return {string}
 */
proto.orion.Order.prototype.getMatcherPublicKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMatcherPublicKey()));
};


/**
 * optional bytes matcher_public_key = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMatcherPublicKey()`
 * @return {!Uint8Array}
 */
proto.orion.Order.prototype.getMatcherPublicKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMatcherPublicKey()));
};


/** @param {!(string|Uint8Array)} value */
proto.orion.Order.prototype.setMatcherPublicKey = function(value) {
  jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional AssetPair asset_pair = 4;
 * @return {?proto.orion.AssetPair}
 */
proto.orion.Order.prototype.getAssetPair = function() {
  return /** @type{?proto.orion.AssetPair} */ (
    jspb.Message.getWrapperField(this, proto.orion.AssetPair, 4));
};


/** @param {?proto.orion.AssetPair|undefined} value */
proto.orion.Order.prototype.setAssetPair = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.orion.Order.prototype.clearAssetPair = function() {
  this.setAssetPair(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.orion.Order.prototype.hasAssetPair = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Side order_side = 5;
 * @return {!proto.orion.Order.Side}
 */
proto.orion.Order.prototype.getOrderSide = function() {
  return /** @type {!proto.orion.Order.Side} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {!proto.orion.Order.Side} value */
proto.orion.Order.prototype.setOrderSide = function(value) {
  jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional int64 amount = 6;
 * @return {number}
 */
proto.orion.Order.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {number} value */
proto.orion.Order.prototype.setAmount = function(value) {
  jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int64 price = 7;
 * @return {number}
 */
proto.orion.Order.prototype.getPrice = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/** @param {number} value */
proto.orion.Order.prototype.setPrice = function(value) {
  jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 timestamp = 8;
 * @return {number}
 */
proto.orion.Order.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {number} value */
proto.orion.Order.prototype.setTimestamp = function(value) {
  jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 expiration = 9;
 * @return {number}
 */
proto.orion.Order.prototype.getExpiration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/** @param {number} value */
proto.orion.Order.prototype.setExpiration = function(value) {
  jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional Amount matcher_fee = 10;
 * @return {?proto.orion.Amount}
 */
proto.orion.Order.prototype.getMatcherFee = function() {
  return /** @type{?proto.orion.Amount} */ (
    jspb.Message.getWrapperField(this, proto.orion.Amount, 10));
};


/** @param {?proto.orion.Amount|undefined} value */
proto.orion.Order.prototype.setMatcherFee = function(value) {
  jspb.Message.setWrapperField(this, 10, value);
};


proto.orion.Order.prototype.clearMatcherFee = function() {
  this.setMatcherFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.orion.Order.prototype.hasMatcherFee = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional int32 version = 11;
 * @return {number}
 */
proto.orion.Order.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/** @param {number} value */
proto.orion.Order.prototype.setVersion = function(value) {
  jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * repeated bytes proofs = 12;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.orion.Order.prototype.getProofsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 12));
};


/**
 * repeated bytes proofs = 12;
 * This is a type-conversion wrapper around `getProofsList()`
 * @return {!Array<string>}
 */
proto.orion.Order.prototype.getProofsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getProofsList()));
};


/**
 * repeated bytes proofs = 12;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getProofsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.orion.Order.prototype.getProofsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getProofsList()));
};


/** @param {!(Array<!Uint8Array>|Array<string>)} value */
proto.orion.Order.prototype.setProofsList = function(value) {
  jspb.Message.setField(this, 12, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 */
proto.orion.Order.prototype.addProofs = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 12, value, opt_index);
};


proto.orion.Order.prototype.clearProofsList = function() {
  this.setProofsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orion.ExchangeTransactionData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.orion.ExchangeTransactionData.repeatedFields_, null);
};
goog.inherits(proto.orion.ExchangeTransactionData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.orion.ExchangeTransactionData.displayName = 'proto.orion.ExchangeTransactionData';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.orion.ExchangeTransactionData.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orion.ExchangeTransactionData.prototype.toObject = function(opt_includeInstance) {
  return proto.orion.ExchangeTransactionData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orion.ExchangeTransactionData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.ExchangeTransactionData.toObject = function(includeInstance, msg) {
  var f, obj = {
    amount: jspb.Message.getFieldWithDefault(msg, 1, 0),
    price: jspb.Message.getFieldWithDefault(msg, 2, 0),
    buyMatcherFee: jspb.Message.getFieldWithDefault(msg, 3, 0),
    sellMatcherFee: jspb.Message.getFieldWithDefault(msg, 4, 0),
    ordersList: jspb.Message.toObjectList(msg.getOrdersList(),
    proto.orion.Order.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orion.ExchangeTransactionData}
 */
proto.orion.ExchangeTransactionData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orion.ExchangeTransactionData;
  return proto.orion.ExchangeTransactionData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orion.ExchangeTransactionData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orion.ExchangeTransactionData}
 */
proto.orion.ExchangeTransactionData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAmount(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setPrice(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBuyMatcherFee(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSellMatcherFee(value);
      break;
    case 5:
      var value = new proto.orion.Order;
      reader.readMessage(value,proto.orion.Order.deserializeBinaryFromReader);
      msg.addOrders(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orion.ExchangeTransactionData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orion.ExchangeTransactionData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orion.ExchangeTransactionData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orion.ExchangeTransactionData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmount();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getPrice();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getBuyMatcherFee();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getSellMatcherFee();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getOrdersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.orion.Order.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 amount = 1;
 * @return {number}
 */
proto.orion.ExchangeTransactionData.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.orion.ExchangeTransactionData.prototype.setAmount = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 price = 2;
 * @return {number}
 */
proto.orion.ExchangeTransactionData.prototype.getPrice = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.orion.ExchangeTransactionData.prototype.setPrice = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 buy_matcher_fee = 3;
 * @return {number}
 */
proto.orion.ExchangeTransactionData.prototype.getBuyMatcherFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.orion.ExchangeTransactionData.prototype.setBuyMatcherFee = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 sell_matcher_fee = 4;
 * @return {number}
 */
proto.orion.ExchangeTransactionData.prototype.getSellMatcherFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.orion.ExchangeTransactionData.prototype.setSellMatcherFee = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * repeated Order orders = 5;
 * @return {!Array<!proto.orion.Order>}
 */
proto.orion.ExchangeTransactionData.prototype.getOrdersList = function() {
  return /** @type{!Array<!proto.orion.Order>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.orion.Order, 5));
};


/** @param {!Array<!proto.orion.Order>} value */
proto.orion.ExchangeTransactionData.prototype.setOrdersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.orion.Order=} opt_value
 * @param {number=} opt_index
 * @return {!proto.orion.Order}
 */
proto.orion.ExchangeTransactionData.prototype.addOrders = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.orion.Order, opt_index);
};


proto.orion.ExchangeTransactionData.prototype.clearOrdersList = function() {
  this.setOrdersList([]);
};


goog.object.extend(exports, proto.orion);
