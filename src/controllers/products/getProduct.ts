import mongoose from 'mongoose';
import { Interaction } from '../../models/interactionModel';
import { ProductModel } from '../../models/productModel';

export const getProducts = async (req: any, res: any) => {
  try {
    const products = await ProductModel.find().populate('category', 'name');


    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export async function getProduct (req:any, res:any){
  try {
    const { id } = req.body;

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

export const deleteProduct = async (req: any, res: any) => {
   try {
         const { id } = req.body;
         if (!id) throw new Error("Product ID is required");
 
         await ProductModel.findByIdAndDelete(id);
         return res.status(200).send({ message: "Product deleted successfully" });
     } catch (error: any) {
         console.error(error);
         return res.status(500).send({ error: error.message });
     }
};

export const editProducts = async (req: any, res: any) => {
    try {
        const { id, updates } = req.body;
        if (!id || !updates) throw new Error("Product ID and updates are required");

        await ProductModel.findByIdAndUpdate(id, updates, { new: true });
        return res.status(200).send({ message: "Product updated successfully" });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};


export async function getRecommendedProducts(req: any, res: any) {
  try {
    const client = req.client;
    const clientId = client?._id;

    const recommendations = await recommendedProducts(clientId);
    res.status(201).json(recommendations);
  } catch (error) {
     
      res.status(500).json({ message: 'Error fetching products', error });
  }


}


export async function recommendedProducts (clientId: string) {
  try {
    const recommendations = await Interaction.aggregate([

      { $match: { clientId: new mongoose.Types.ObjectId(clientId) } }, {
        $group: {
          _id: '$productId',
          totalScore: { $sum: '$score' },
        },
      }, { 
        $sort: { totalScore: -1 } },

      { $limit: 5 },

      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails',
        },
      },

      { $unwind: '$productDetails' },
    ]);

    return recommendations.map((rec) => rec.productDetails);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

