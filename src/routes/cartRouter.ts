import express from 'express';
import { addToCart, removeItem } from '../controllers/cart/setCart';
import { getCart } from '../controllers/cart/getCart';
import { getClientFromCookie } from '../controllers/cart/getClientMiddleware';
const cartRouter = express.Router();

cartRouter.post("/add-to-cart",getClientFromCookie, addToCart);
cartRouter.get("/get-cart", getClientFromCookie, getCart);
cartRouter.delete("/remove-item", removeItem);


export default cartRouter;