"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var fs_1 = require("fs");
// Configure Multer storage
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        var uploadDir = 'uploads/';
        if (!fs_1["default"].existsSync(uploadDir)) {
            fs_1["default"].mkdirSync(uploadDir); // Create the uploads directory if it doesn't exist
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
// Multer middleware
var upload = multer_1["default"]({ storage: storage });
exports["default"] = upload;
