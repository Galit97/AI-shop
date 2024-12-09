import { AdminModel } from "../../models/adminModel";
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { console } from "inspector";

export const secret="shsxxsloswk520"; //temporary secret
const saltRounds = parseInt("12", 10); //temporary rounds
// const saltRounds = parseInt(process.env.SALTROUNDS||"", 10);


export async function addAdmin(req: any, res: any) {
    try {
        if(!saltRounds) throw new Error("no Salt!");

        const { firstName, 
                lastName, 
                email,
                password, 
            } = req.body;

        if(!firstName || !lastName || !email || !password ) {
            throw new Error('Please fill all fields');
        };

        //hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //send request to DB
        await AdminModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).send({ message: "Admin added successfully" });

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}

export async function loginAdmin(req: any, res: any) {
    try {
        const { email, password } = req.body;
        console.log("l", req.body, email);

        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(400).send({ message: "You are not registered!!!!" });
        };

        // Check if the password is correct
        // const passwordValid = await bcrypt.compare(password, admin.password);
        // if(!passwordValid) {
        //     return res.status(400).send({ message: "The password you provided is incorrect" });
        // };

        //send client's id to the cookie
        res.cookie('admin', admin._id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(200).send({ message: "Login successful" });

    } catch (error: any) {
        if (error.code = "11000") {
            res.status(400).send({ error: "You are not registered" })
        }
        console.error(error);
        return res.status(500).send({ error: error.message });
    };
};