"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setPurchase_1 = require("../controllers/purchases/setPurchase");
var purchaseRouter = express_1["default"].Router();
purchaseRouter.post('/create-purchace', setPurchase_1.setPurchase);
exports["default"] = purchaseRouter;
