"use strict";
exports.__esModule = true;
var express_1 = require("express");
var comments_1 = require("../controllers/comments/comments");
var commentsRouter = express_1["default"].Router();
// Create a new comment
commentsRouter.post('/add-comment', comments_1.addComment);
commentsRouter.get('/get-comments', comments_1.getCommentsByProduct);
commentsRouter["delete"]('/delete-comments', comments_1.deleteComment);
exports["default"] = commentsRouter;
