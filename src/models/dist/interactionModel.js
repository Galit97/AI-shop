"use strict";
exports.__esModule = true;
exports.Interaction = exports.interactionSchema = void 0;
var mongoose_1 = require("mongoose");
exports.interactionSchema = new mongoose_1["default"].Schema({
    clientId: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    productId: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    type: {
        type: String,
        "enum": ['view', 'purchase', 'rating'],
        required: true
    },
    timestamp: {
        type: Date,
        "default": Date.now
    },
    score: {
        type: Number,
        "default": 1
    }
});
exports.Interaction = mongoose_1["default"].model('Interaction', exports.interactionSchema);
