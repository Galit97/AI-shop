import { ClientModel } from "../../models/clientModel";
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const secret="shsxxsloswk520"; //temporary secret
const saltRounds = parseInt("12", 10); //temporary rounds
// const saltRounds = parseInt(process.env.SALTROUNDS||"", 10);


export async function register(req: any, res: any) {
    try {
        if(!saltRounds) throw new Error("no Salt!");

        const { firstName, 
                lastName, 
                email,
                phoneNumber,  
                password, 
            } = req.body;

        if(!firstName || !lastName || !email || !phoneNumber || !password ) {
            throw new Error('Please fill all fields');
        };

        //hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //send request to DB
        await ClientModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        res.cookie('client', { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(201).send({ message: "User registered successfully" });

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}

export async function login(req: any, res: any) {
    try {
        const { email, password } = req.body;

        const client = await ClientModel.findOne({ email });
        if (!client) {
            return res.status(400).send({ message: "You are not registered" });
        };

        // Check if the password is correct
        const passwordValid = await bcrypt.compare(password, client.password);
        if(!passwordValid) {
            return res.status(400).send({ message: "The password you provided is incorrect" });
        };

        //send client's id to the cookie
        res.cookie('client', client._id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(200).send({ message: "Login successful" });

    } catch (error: any) {
        if (error.code = "11000") {
            res.status(400).send({ error: "You are not registered" })
        }
        console.error(error);
        return res.status(500).send({ error: error.message });
    };
};