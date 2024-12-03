import express from 'express';
import { addProduct } from '../controllers/products/setProduct';
// import { getMyProducts, getProducts } from '../../controllers/products/getProducts';

const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
// productRouter.get('/my-products',getMyProducts)
// productRouter.get('/get-all-products',getProducts);

export default productRouter;