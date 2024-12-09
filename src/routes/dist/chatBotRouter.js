"use strict";
exports.__esModule = true;
var express_1 = require("express");
var chatBotController_1 = require("../controllers/chatBot/chatBotController");
var chatBotRouter = express_1["default"].Router();
chatBotRouter.post('/chat', chatBotController_1.chatBotPost);
exports["default"] = chatBotRouter;
