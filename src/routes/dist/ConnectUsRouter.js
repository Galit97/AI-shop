"use strict";
exports.__esModule = true;
var express_1 = require("express");
var connectUs_1 = require("../controllers/connectUs/connectUs");
var connectUsRouter = express_1["default"].Router();
connectUsRouter.post("/send-email", connectUs_1.connectUs);
exports["default"] = connectUsRouter;
