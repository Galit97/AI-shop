import { CartModel } from "../../models/cartModel";

// export async function getCart(req: any, res: any) {
//     try {
//         const { productId, userId } = req.body;

        
//     } catch (error: any) {
//         console.error("Error in addToCart:", error);
//         return res.status(500).send({ error: "Internal Server Error" });
//     }
// };


export async function getCart(req: any, res: any) {
    try {

        //TODO GET THE USER'S CART
        const products = await CartModel.find();
        if(!products) return res.status(404).send({ error: "no products"});
        
        return res.status(200).send(products);
    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}; 
