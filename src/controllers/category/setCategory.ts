import { CategoryModel } from "../../models/categoryModel";

export async function addCategory(req: any, res: any) {
    try {
        const { name } = req.body;

        if (!name ) {
            return res.status(400).send({ error: "Missing required fields." });
        }

        const result = await CategoryModel.create({
            name,
        
        });

        if (!result) {
            return res.status(400).send({ error: "Failed to create category." });
        }

        return res.status(201).send({ message: "Category added successfully", Category: result });
    } catch (error: any) {
        console.error("Error in addCategory:", error);

        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).send({ error: `${duplicateField} already exists.` });
        }

        return res.status(500).send({ error: "Internal Server Error" });
    }
}


export async function getCategoryById(req: any, res: any) {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).send({ error: "Category not found" });
        }

        return res.status(200).send(category);
    } catch (error) {
        console.error("Error in getCategoryById:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



export async function deleteCategory(req: any, res: any) {
    const { id } = req.body;
    try {
        console.log(`Deleting category with id: ${id}`);

        const category = await CategoryModel.findById(id);
        if (!category) {
            console.log(`Category with id ${id} not found`);
            return res.status(401).json({ error: "Category not found" });
        }

        await CategoryModel.findByIdAndDelete(id);
        console.log(`Category with id ${id} deleted`);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function editCategory(req: any, res: any) {
    const { id, name } = req.body;

    try {
        console.log(`Editing Category with id: ${id}`);
        
        const updatedCategoryFields: Partial<{ name: string; }> = {};
        if (name !== undefined) updatedCategoryFields.name = name;
     

        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updatedCategoryFields, { new: true });
        
        if (!updatedCategory) {
            console.log(`Category with id ${id} not found`);
            return res.status(404).json({ error: "Category not found" });
        }

        console.log(`Category with id ${id} updated`);
        res.status(200).json({ message: "Category updated successfully", Category: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

