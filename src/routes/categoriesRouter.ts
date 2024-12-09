import express from 'express';
import { addCategory, deleteCategory} from '../controllers/category/setCategory';
import { getAllCategories, getCategory } from '../controllers/category/getCategory';

const categoryRouter = express.Router();

categoryRouter.post("/add-category", addCategory);

categoryRouter.delete("/delete-category", deleteCategory);

// categoryRouter.put("/update-category", updateCategory);

categoryRouter.get("/get-all-categories", getAllCategories);

export default categoryRouter;
