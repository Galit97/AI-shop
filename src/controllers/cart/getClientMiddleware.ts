import { ClientModel } from "../../models/clientModel";
import express, { Request, Response, NextFunction } from 'express';


export async function getClientFromCookie(req: any, res: any, next: NextFunction) {
    console.log("getClientFromCookie");
    try {
        const clientId = req.cookies.client; 
        if( !clientId ) return res.status(200).send({ message: "Client not connected" });
        console.log("ccc", clientId);
        const client = await ClientModel.findOne({ _id: clientId });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        req.client = client;
        next();
        
    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}; 
