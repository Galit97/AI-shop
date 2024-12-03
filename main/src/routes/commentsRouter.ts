import express from 'express';
import { addComment, getCommentsByProduct, deleteComment } from '../controllers/comments/comments';

const commentsRouter = express.Router();

// Create a new comment
commentsRouter.post('/add-comment', addComment);
commentsRouter.get('/get-comments', getCommentsByProduct);
commentsRouter.delete('/delete-comments', deleteComment);


export default commentsRouter;