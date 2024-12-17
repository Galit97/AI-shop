import express from 'express';
import { addToCart, removeItem } from '../controllers/cart/setCart';
import { getCart } from '../controllers/cart/getCart';
const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addToCart);
cartRouter.get("/get-cart", getCart);
cartRouter.delete("/remove-item", removeItem);


export default cartRouter;