"use strict";
exports.__esModule = true;
exports.CartModel = exports.CartSchema = void 0;
var mongoose_1 = require("mongoose");
exports.CartSchema = new mongoose_1.Schema({
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        },
    ],
    clientId: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
exports.CartModel = mongoose_1.model("Cart", exports.CartSchema);
