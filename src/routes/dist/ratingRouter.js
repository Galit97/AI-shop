"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setRating_1 = require("../controllers/rating/setRating");
var ratingRouter = express_1["default"].Router();
ratingRouter.post('/add-rating', setRating_1.setRating);
exports["default"] = ratingRouter;
