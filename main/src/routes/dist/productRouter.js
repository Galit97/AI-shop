"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setProduct_1 = require("../controllers/products/setProduct");
// import { getMyProducts, getProducts } from '../../controllers/products/getProducts';
var productRouter = express_1["default"].Router();
productRouter.post('/add-product', setProduct_1.addProduct);
// productRouter.get('/my-products',getMyProducts)
// productRouter.get('/get-all-products',getProducts);
exports["default"] = productRouter;
