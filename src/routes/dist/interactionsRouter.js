"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setInteraction_1 = require("../controllers/interactions/setInteraction");
var interactionsRouter = express_1["default"].Router();
interactionsRouter.post("/add-interaction", setInteraction_1.setInteraction);
exports["default"] = interactionsRouter;
