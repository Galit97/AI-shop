import express from 'express';
import { resetCookies } from '../controllers/cookies/restCookies';
const cookiesRouter = express.Router();
cookiesRouter.get('/resetCookies', resetCookies
);
export default cookiesRouter;