import { Request, Response } from 'express';
import { ProductModel } from '../../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate('category', 'name');
    console.log("products", products);
    // .populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};
