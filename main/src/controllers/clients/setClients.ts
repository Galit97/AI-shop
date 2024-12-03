import { ClientModel } from "../../models/clientModel";

export async function register(req: any, res: any) {
    try {
        const { firstName, lastName, email, password, phoneNumber, address } = req.body;

        if(!firstName || !lastName || !email || !password || !phoneNumber) {
            throw new Error('Please fill all fields');
        }

        //send request to DB
        await ClientModel.create({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
        });

        res.cookie('user', { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(201).send({ message: "User registered successfully" });

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}

export async function login(req: any, res: any) {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new Error("Please fill all fields");

        // Find user by email
        const user = await ClientModel.findOne({ email, password });
        if (!user) {
            return res.status(400).send({ error: "Invalid email or password" });
        }

        //send cookie to client
        res.cookie('user', user._id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(200).send({ message: "Login successful" });

    } catch (error: any) {
        if (error.code = "11000") {
            res.status(400).send({ error: "user already exists" })
        }
        console.error(error);
        return res.status(500).send({ error: error.message });
    };
}