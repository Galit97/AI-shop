import { ClientModel } from "../../models/clientModel";

export async function getClient(req: any, res: any) {
    try {
       
        const clientId = req.cookies.client; 
        if (!clientId) {
            return res.status(401).json({ message: 'Unauthorized: No clientId provided' });
        };
        const client = await ClientModel.findOne({ _id: clientId }, 'firstName');

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({
            message: 'Client retrieved successfully',
            client: {
                firstName: client.firstName,
            },
        });


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

