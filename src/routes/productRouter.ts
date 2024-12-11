import express from 'express';
import { addProduct } from '../controllers/products/setProduct';
import { deleteProducts, editProducts, getProducts } from '../controllers/products/getProduct';
import upload from '../controllers/products/uploadMiddleware';

const productRouter = express.Router();

productRouter.post('/add-product', upload.single('image'), addProduct);
productRouter.get('/get-products', getProducts);
productRouter.patch('/edit-products', editProducts);
productRouter.delete('/delete-products', deleteProducts);

export default productRouter;
