"use strict";
exports.__esModule = true;
var express_1 = require("express");
var restCookies_1 = require("../controllers/cookies/restCookies");
var cookiesRouter = express_1["default"].Router();
cookiesRouter.get('/resetCookies', restCookies_1.resetCookies);
exports["default"] = cookiesRouter;
