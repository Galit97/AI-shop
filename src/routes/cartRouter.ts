import express from 'express';
import { addToCart } from '../controllers/cart/setCart';
import { getCart, removeItem } from '../controllers/cart/getCart';
const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addToCart);
cartRouter.post("/get-cart", getCart);
cartRouter.delete("/remove-item", removeItem);


export default cartRouter;