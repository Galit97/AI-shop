"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
require("dotenv/config");
var clientRouter_1 = require("./routes/clientRouter");
var productRouter_1 = require("./routes/productRouter");
var commentsRouter_1 = require("./routes/commentsRouter");
var adminRouter_1 = require("./routes/adminRouter");
var cookie_parser_1 = require("cookie-parser");
var chatBotRouter_1 = require("./routes/chatBotRouter");
var categoriesRouter_1 = require("./routes/categoriesRouter");
var cartRouter_1 = require("./routes/cartRouter");
var cookiesRouter_1 = require("./routes/cookiesRouter");
var ConnectUsRouter_1 = require("./routes/ConnectUsRouter");
var app = express_1["default"]();
var port = process.env.PORT || 3000;
app.use(body_parser_1["default"].json());
app.use(express_1["default"].static('public'));
app.use('/uploads', express_1["default"].static('uploads'));
app.use(cookie_parser_1["default"]());
app.listen(port, function () {
    console.log("Server listening on port " + port);
});
//routes
app.use("/api/clients", clientRouter_1["default"]);
app.use("/api/products", productRouter_1["default"]);
app.use("/api/comments", commentsRouter_1["default"]);
app.use("/api/admin", adminRouter_1["default"]);
app.use("/api/chatBot", chatBotRouter_1["default"]);
app.use("/api/categories", categoriesRouter_1["default"]);
app.use("/api/cart", cartRouter_1["default"]);
app.use("/api/cookies", cookiesRouter_1["default"]);
app.use("/api/connectUs", ConnectUsRouter_1["default"]);
//DB
var dbUrl = "mongodb+srv://yosefib88:FYdIUMhMIwGscX4y@cluster0.b5vsm.mongodb.net";
var database = 'AI-Shop';
//DB connection
mongoose_1["default"].connect(dbUrl + "/" + database).then(function () {
    console.info("DB connected");
})["catch"](function (err) {
    console.error(err);
});
