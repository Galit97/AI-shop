import express from 'express';
import { addProduct } from '../controllers/products/setProduct';
import { getProducts } from '../controllers/products/getProduct';

const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/get-products', getProducts);

export default productRouter;
