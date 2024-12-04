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
var app = express_1["default"]();
var port = process.env.PORT || 3000;
app.use(body_parser_1["default"].json());
app.use(express_1["default"].static('public'));
app.listen(port, function () {
    console.log("Server listening on port " + port);
});
//routes
app.use("/api/clients", clientRouter_1["default"]);
app.use("/api/products", productRouter_1["default"]);
app.use("/api/comments", commentsRouter_1["default"]);
app.use("/api/admin", adminRouter_1["default"]);
//DB
var dbUrl = "mongodb+srv://toharkenin:Q9cij3M4GHk%409Sx@cluster0.bbpiv.mongodb.net";
var database = 'AI-Shop';
//DB connection
mongoose_1["default"].connect(dbUrl + "/" + database).then(function () {
    console.info("DB connected");
})["catch"](function (err) {
    console.error(err);
});
