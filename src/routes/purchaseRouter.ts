import express from 'express';
import { setPurchase } from '../controllers/purchases/setPurchase';

const purchaseRouter = express.Router();

purchaseRouter.post('/create-purchace', setPurchase);

export default purchaseRouter;
