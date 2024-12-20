import { CartModel } from "../../models/cartModel";
import { ProductModel } from "../../models/productModel";

export async function addToCart(req: any, res: any) {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    const client = req.client;
    const clientId = client?._id;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await CartModel.findOne({ clientId }).populate(
      "products.product"
    );

    if (cart) {
      const productExists = cart.products.find(
        (p) => p.product.toString() === productId
      );

      if (productExists) {
        productExists.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
        cart.total += product.price;
      }
    } else {
      cart = new CartModel({
        products: [{ product: productId, quantity }],
        clientId,
        total: quantity * product.price,
      });
    }

    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error: any) {
    console.error("Error in addToCart:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function updateCart(req: any, res: any) {
  try {
    const { productId, action } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const client = req.client;
    const clientId = client?._id;

    let cart = await CartModel.findOne({ clientId }).populate(
      "products.product"
    );

    if (action === "increase") {
    } else if (action === "decrease") {
    } else {
      // remove from cart
    }
  } catch (error: any) {
    console.error("Error in update cart:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
