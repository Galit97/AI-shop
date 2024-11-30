"use strict";
exports.__esModule = true;
exports.ProductModel = exports.ProductSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String
    }
});
exports.ProductModel = mongoose_1.model("Product", exports.ProductSchema);
