import express from 'express';
import { addProduct } from '../controllers/products/setProduct';
import { deleteProduct, editProducts, getProduct, getProducts } from '../controllers/products/getProduct';
import upload from '../controllers/products/uploadMiddleware';

const productRouter = express.Router();

productRouter.post('/add-product', upload.single('image'), addProduct);
productRouter.get('/get-products', getProducts);
productRouter.patch('/edit-product', editProducts);
productRouter.delete('/delete-product', deleteProduct);
productRouter.post('/get-product', getProduct);

export default productRouter;
