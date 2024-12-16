import { CartModel } from "../../models/cartModel";

export async function getCart(req: any, res: any) {
    try {
        const { productId, userId } = req.body;

        
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