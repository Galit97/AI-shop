import express from 'express';
import { login, register } from '../controllers/clients/setClients';
import { getAllClients, getClient } from '../controllers/clients/getClients';
const clientRouter = express.Router();


clientRouter.post("/create-client", register);
clientRouter.post("/login", login);
clientRouter.get("/get-all-clients", getAllClients);
clientRouter.post("/get-client", getClient);

export default clientRouter;