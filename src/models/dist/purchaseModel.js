"use strict";
exports.__esModule = true;
exports.PurchaseModel = exports.PurchaseSchema = void 0;
var mongoose_1 = require("mongoose");
;
exports.PurchaseSchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    }
});
exports.PurchaseModel = mongoose_1.model('Purchase', exports.PurchaseSchema);
