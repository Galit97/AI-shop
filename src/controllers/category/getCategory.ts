import { CategoryModel } from "../../models/categoryModel";

export async function getCategory(req: any, res: any) {
    try {
        const { id } = req.cookie;

        const Category = await CategoryModel.findOne(id: id);

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

export async function getAllCategories(req: any, res: any) {
    try {
      

    } catch (error: any) {
     
    };
};