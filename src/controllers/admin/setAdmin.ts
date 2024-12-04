import { ClientModel } from "../../models/clientModel";
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const secret="shsxxsloswk520"; //temporary secret
const saltRounds = parseInt("12", 10); //temporary rounds
// const saltRounds = parseInt(process.env.SALTROUNDS||"", 10);


export async function registerAdmin(req: any, res: any) {
    try {
       
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}

export async function loginAdmin(req: any, res: any) {
    try {
       

    } catch (error: any) {
       
    };
};