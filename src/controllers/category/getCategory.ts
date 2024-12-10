import { CategoryModel } from "../../models/categoryModel";

export async function getAllCategories(req: any, res: any) {
    try {
        const categories = await CategoryModel.find();
        return res.status(200).send(categories);
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
