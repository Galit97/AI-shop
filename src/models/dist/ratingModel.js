"use strict";
exports.__esModule = true;
exports.RatingModel = exports.RatingSchema = void 0;
var mongoose_1 = require("mongoose");
exports.RatingSchema = new mongoose_1.Schema({
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
exports.RatingModel = mongoose_1.model('Rating', exports.RatingSchema);
