"use strict";
exports.__esModule = true;
exports.AdminModel = exports.AdminSchema = void 0;
var mongoose_1 = require("mongoose");
exports.AdminSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});
exports.AdminModel = mongoose_1.model("Admin", exports.AdminSchema);
