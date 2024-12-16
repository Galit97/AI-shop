import { Request, Response } from 'express';
import { ProductModel } from '../../models/productModel';

export async function addProduct(req: Request, res: Response) {
  console.log("inserting product");
    try {
 
      const { name, description, category, price, quantity, inSale } = req.body;
      console.log("products", req.body);
      const newProduct = new ProductModel({
        name,
        description,
        category,
        price,
        quantity,
        inSale,
        image: req.file?.path || '',
        
      });

      console.log("new product", newProduct);

      await newProduct.save();
      res.status(201).json({ message: 'Product saved'});
    } catch (error) {
      res.status(500).json({ message: 'Error saving product', error });
    }
  }
