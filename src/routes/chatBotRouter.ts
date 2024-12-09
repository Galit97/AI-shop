import express from 'express';
// import { getApiKey } from '../controllers/chatBot/getApiKey';
import { chatBotPost } from '../controllers/chatBot/chatBotController';

const chatBotRouter = express.Router();

// chatBotRouter.get('/getApiKey', getApiKey);
chatBotRouter.post('/chat', chatBotPost);

export default chatBotRouter; 