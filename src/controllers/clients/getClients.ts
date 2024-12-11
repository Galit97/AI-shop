import { ClientModel } from "../../models/clientModel";

export async function getClient(req: any, res: any) {
    try {
        const { id } = req.cookie;



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
