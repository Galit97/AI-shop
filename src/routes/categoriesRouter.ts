import express from "express";
import { addCategory, deleteCategory, editCategory } from "../controllers/category/setCategory";
import { getAllCategories } from "../controllers/category/getCategory";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", addCategory);
categoryRouter.delete("/delete-category", deleteCategory);
categoryRouter.patch("/edit-category", editCategory);
categoryRouter.get("/get-all-categories", getAllCategories);

export default categoryRouter;
