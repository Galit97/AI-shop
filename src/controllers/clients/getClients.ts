import { ClientModel } from "../../models/clientModel";

export async function getClient(req: any, res: any) {
    try {
       
        const clientId = req.cookies.client; 
        console.log(clientId);
        if (!clientId) {
            return res.status(401).json({ message: 'Unauthorized: No clientId provided' });
        };
        return res.status(200).send({ message: "client", clientId });


    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

export async function getAllClients(req: any, res: any) {
    try {
        const clients = await ClientModel.find({});
        return res.status(200).json(clients);
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

