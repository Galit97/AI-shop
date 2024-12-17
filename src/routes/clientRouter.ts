import express from 'express';
import { login, register, updateClient, deleteClient } from '../controllers/clients/setClients';
import { getAllClients, getClient } from '../controllers/clients/getClients';
const clientRouter = express.Router();

clientRouter.post("/add-client", register);
clientRouter.post("/login-client", login);
clientRouter.get("/get-all-clients", getAllClients);
clientRouter.get("/get-client", getClient);
clientRouter.delete("/delete-client", deleteClient);
clientRouter.patch("/update-client", updateClient);

export default clientRouter;