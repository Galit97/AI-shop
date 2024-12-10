"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setProduct_1 = require("../controllers/products/setProduct");
var getProduct_1 = require("../controllers/products/getProduct");
var productRouter = express_1["default"].Router();
productRouter.post('/add-product', setProduct_1.addProduct);
productRouter.get('/get-products', getProduct_1.getProducts);
exports["default"] = productRouter;
