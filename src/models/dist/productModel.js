"use strict";
exports.__esModule = true;
exports.ProductModel = exports.ProductSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    inSale: {
        type: Boolean,
        required: true
    },
    comments: {
        type: [String],
        required: true
    },
    rating: {
        type: Number
    }
});
exports.ProductModel = mongoose_1.model("Product", exports.ProductSchema);
