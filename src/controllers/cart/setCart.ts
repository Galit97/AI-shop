import { CartModel } from "../../models/cartModel";
import { ProductModel } from "../../models/productModel";

export async function addToCart(req: any, res: any) {
    try {
             const { productId, clientId, quantity } = req.body;
             if (!productId || !quantity) {
                 return res.status(400).json({ message: 'Product ID and quantity are required' });
             }
     
             const product = await ProductModel.findById(productId);
             if (!product) {
                 return res.status(404).json({ message: 'Product not found' });
             }
     
             // Step 4: Check if the cart exists for this clientId
             let cart = await CartModel.findOne({ clientId });
     
             if (cart) {
                 // Step 5: Update existing cart
                 const existingProduct = cart.products.find(p => p.product.toString() === productId);
     
                 if (existingProduct) {
                     // Increment quantity if product already in cart
                     existingProduct.quantity += quantity;
                 } else {
                     // Add new product to cart
                     cart.products.push({ product: productId, quantity });
                 }
             } else {
                 // Step 6: Create a new cart if none exists
                 cart = new CartModel({
                     clientId,
                     products: [{ product: productId, quantity }],
                     total: quantity * product.price, // Optionally calculate total here
                 });
             }
     
             // Step 7: Save the cart
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