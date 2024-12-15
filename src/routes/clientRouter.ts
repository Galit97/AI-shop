import express from 'express';
import { login, register, updateClient, deleteClient } from '../controllers/clients/setClients';
import { getAllClients, getClient, getNameFromCookies } from '../controllers/clients/getClients';
const clientRouter = express.Router();

clientRouter.post("/add-client", register);
clientRouter.post("/login-client", login);
clientRouter.get("/get-all-clients", getAllClients);
clientRouter.post("/get-client", getClient);
clientRouter.delete("/delete-client", deleteClient);
clientRouter.put("/update-client", updateClient);
clientRouter.get("/get-client-name", getNameFromCookies);

export default clientRouter;