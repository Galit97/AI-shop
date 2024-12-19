import express from 'express';
import { connectUs } from '../controllers/connectUs/connectUs';

const connectUsRouter = express.Router();

connectUsRouter.post("/send-email", connectUs)

export default connectUsRouter