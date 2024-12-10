import { Request, Response } from 'express';
import { ProductModel } from '../../models/productModel';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

export const addProduct = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      const { name, description, category, price, quantity, inStock, inSale } = req.body;

      const newProduct = new ProductModel({
        name,
        description,
        category,
        price,
        quantity,
        inStock,
        inSale,
        image: req.file?.path || '',
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({ message: 'Product saved', savedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error saving product', error });
    }
  },
];
