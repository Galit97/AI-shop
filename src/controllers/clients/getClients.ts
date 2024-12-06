import { ClientModel } from "../../models/clientModel";

export async function getClient(req: any, res: any) {
    try {
        const { id } = req.cookie;

        // const client = await ClientModel.findOne(id: id);

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

export async function getAllClients(req: any, res: any) {
    try {
      

    } catch (error: any) {
     
    };
};