"use strict";
exports.__esModule = true;
exports.CategoryModel = exports.CategorySchema = void 0;
var mongoose_1 = require("mongoose");
;
exports.CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports.CategoryModel = mongoose_1.model("Category", exports.CategorySchema);
