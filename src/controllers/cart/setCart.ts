import { CartModel } from "../../models/cartModel";
import { ProductModel } from "../../models/productModel";

export async function addToCart(req: any, res: any) {
    try {
             const { productId, quantity } = req.body;
             if (!productId || !quantity) {
                 return res.status(400).json({ message: 'Product ID and quantity are required' });
             };

             const client = req.client;
             const clientId = client?._id;
     
             const product = await ProductModel.findById(productId);
             if (!product) {
                 return res.status(404).json({ message: 'Product not found' });
             }
     
             let cart = await CartModel.findOne({ clientId });
     
             if (cart) {
                 const productExists = cart.products.find(p => p.product.toString() === productId);
     
                 if (productExists) {
                    productExists.quantity += quantity;
                 } else {
                     cart.products.push({ product: productId, quantity });
                 }
             } else {
                 cart = new CartModel({
                     clientId,
                     products: [{ product: productId, quantity }],
                     total: quantity * product.price, 
                 });
             }
     
             await cart.save();
     
             res.status(200).json({ message: 'Cart updated successfully', cart });
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