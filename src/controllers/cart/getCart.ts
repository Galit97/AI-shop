import { CartModel } from "../../models/cartModel";


export async function getCart(req: any, res: any) {
    try {
        const client = req.client;
        const clientId = client?._id;

        //TODO GET THE USER'S CART
        const cart = await CartModel.findOne({clientId: clientId});
        if(!cart) return res.status(401).send({ message: "no products"});
        console.log("cart", cart);
        return res.status(200).send(cart);
    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}; 
