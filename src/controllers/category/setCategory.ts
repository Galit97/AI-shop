import { CategoryModel } from "../../models/categoryModel";

export async function addCategory(req: any, res: any) {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ error: "Name is required." });
        }

        const category = await CategoryModel.create({ name });
        return res.status(201).send({ message: "Category added successfully", category });
    } catch (error: any) {
        console.error("Error in addCategory:", error);

        if (error.code === 11000) {
            return res.status(400).send({ error: "Category already exists." });
        }

        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function deleteCategory(req: any, res: any) {
    try {
        const { id } = req.body;

        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).send({ error: "Category not found" });
        }

        return res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function editCategory(req: any, res: any) {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).send({ error: "ID and name are required." });
        }

        const category = await CategoryModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            return res.status(404).send({ error: "Category not found" });
        }

        return res.status(200).send({ message: "Category updated successfully", category });
    } catch (error) {
        console.error("Error in editCategory:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
