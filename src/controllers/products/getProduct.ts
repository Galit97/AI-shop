import { Request, Response } from 'express';
import { ProductModel } from '../../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate('category', 'name');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};


export async function getProduct (req:any, res:any){
  try {
    const { id } = req.body;
    console.log("ff: ", id);
    const product = await ProductModel.findOne({_id: id});
    if (!product) {
      return res.status(400).send({ message: "No product found!!!" });
    };
    console.log("product", product);

    return res.status(200).send({ message: "Got product", product });
  } catch (error:any) {
      return res.status(500).send({ error: error.message });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
   
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const editProducts = async (req: Request, res: Response) => {
  try {
   
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};
