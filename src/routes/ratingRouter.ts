import express from 'express';
import { setRating } from '../controllers/rating/setRating';

const ratingRouter = express.Router();

ratingRouter.post('/add-rating', setRating);

export default ratingRouter;
