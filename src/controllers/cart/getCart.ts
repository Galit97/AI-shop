import { CartModel } from "../../models/cartModel";


export async function getCart(req: any, res: any) {
    try {
        const client = req.client;
        const clientId = client?._id;

        const cart = await CartModel.findOne({ clientId: clientId }).populate('products.product');
        //TODO: Fix Problem of cart empty
        if(!cart || cart.products.length === 0) return res.status(200).send({ message: "cart is empty", products: []});

        return res.status(200).send(cart);
    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}; 
