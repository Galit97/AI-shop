import { CartModel } from "../../models/cartModel";

export async function addToCart(req: any, res: any) {
    try {
        const { productId, userId, price} = req.body;

        if (!productId) {
            return res.status(400).send({ error: "Product is required." });
        };

        const currentDate = new Date();

        //if cart exist, get the cart price and add the new price to

        const cart = await CartModel.create({ productId, userId, currentDate});
        return res.status(201).send({ message: "product added to cart successfully", cart });
    } catch (error: any) {
        console.error("Error in addToCart:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

export async function removeItem(req: any, res: any) {
    try {
        const { productId, userId } = req.body;

        
    } catch (error: any) {
        console.error("Error in addToCart:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}