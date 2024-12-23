import express from 'express';
import { setInteraction } from '../controllers/interactions/setInteraction';
const interactionsRouter = express.Router();

interactionsRouter.post("/add-interaction", setInteraction);


export default interactionsRouter;