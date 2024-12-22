import express from "express";
import { addToCart, updateCart } from "../controllers/cart/setCart";
import { getCart } from "../controllers/cart/getCart";
import { getClientFromCookie } from "../controllers/cart/getClientMiddleware";
const cartRouter = express.Router();

cartRouter.post("/add-to-cart", getClientFromCookie, addToCart);
cartRouter.get("/get-cart", getClientFromCookie, getCart);
cartRouter.patch("/update-cart", getClientFromCookie, updateCart);

export default cartRouter;
