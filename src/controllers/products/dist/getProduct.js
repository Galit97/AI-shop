"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.recommendedProducts = exports.getRecommendedProducts = exports.editProducts = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
var mongoose_1 = require("mongoose");
var interactionModel_1 = require("../../models/interactionModel");
var productModel_1 = require("../../models/productModel");
exports.getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productModel_1.ProductModel.find().populate('category', 'name')];
            case 1:
                products = _a.sent();
                res.status(201).json(products);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Error fetching products', error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.body.id;
                    return [4 /*yield*/, productModel_1.ProductModel.findOne({ _id: id })];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        return [2 /*return*/, res.status(400).send({ message: "No product found!!!" })];
                    }
                    ;
                    console.log("product", product);
                    return [2 /*return*/, res.status(200).send({ message: "Got product", product: product })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.status(500).send({ error: error_2.message })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProduct = getProduct;
;
exports.deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (!id)
                    throw new Error("Product ID is required");
                return [4 /*yield*/, productModel_1.ProductModel.findByIdAndDelete(id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ message: "Product deleted successfully" })];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(500).send({ error: error_3.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, updates, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, updates = _a.updates;
                if (!id || !updates)
                    throw new Error("Product ID and updates are required");
                return [4 /*yield*/, productModel_1.ProductModel.findByIdAndUpdate(id, updates, { "new": true })];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(200).send({ message: "Product updated successfully" })];
            case 2:
                error_4 = _b.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(500).send({ error: error_4.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
function getRecommendedProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var client, clientId, recommendations, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    client = req.client;
                    clientId = client === null || client === void 0 ? void 0 : client._id;
                    return [4 /*yield*/, recommendedProducts(clientId)];
                case 1:
                    recommendations = _a.sent();
                    res.status(201).json(recommendations);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ message: 'Error fetching products', error: error_5 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRecommendedProducts = getRecommendedProducts;
function recommendedProducts(clientId) {
    return __awaiter(this, void 0, void 0, function () {
        var recommendations, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, interactionModel_1.Interaction.aggregate([
                            { $match: { clientId: new mongoose_1["default"].Types.ObjectId(clientId) } }, {
                                $group: {
                                    _id: '$productId',
                                    totalScore: { $sum: '$score' }
                                }
                            }, {
                                $sort: { totalScore: -1 }
                            },
                            { $limit: 5 },
                            {
                                $lookup: {
                                    from: 'products',
                                    localField: '_id',
                                    foreignField: '_id',
                                    as: 'productDetails'
                                }
                            },
                            { $unwind: '$productDetails' },
                        ])];
                case 1:
                    recommendations = _a.sent();
                    return [2 /*return*/, recommendations.map(function (rec) { return rec.productDetails; })];
                case 2:
                    error_6 = _a.sent();
                    console.error('Error fetching recommendations:', error_6);
                    throw error_6;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.recommendedProducts = recommendedProducts;
;
