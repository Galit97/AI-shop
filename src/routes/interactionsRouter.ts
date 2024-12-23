import express from 'express';
import { setInteraction } from '../controllers/interactions/setInteraction';
const interactionsRouter = express.Router();

interactionsRouter.post("/set-interaction", setInteraction);


export default interactionsRouter;