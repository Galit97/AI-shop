import express from 'express';
import { loginAdmin, addAdmin } from '../controllers/admin/setAdmin';
const adminRouter = express.Router();

adminRouter.post("/register-admin", addAdmin);
adminRouter.post("/login-admin", loginAdmin);

export default adminRouter;