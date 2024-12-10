import express from 'express';
import { chatBotPost } from '../controllers/chatBot/chatBotController';

const chatBotRouter = express.Router();

chatBotRouter.post('/chat', chatBotPost);

export default chatBotRouter; 