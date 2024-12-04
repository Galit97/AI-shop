import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/admin/setAdmin';
const adminRouter = express.Router();

adminRouter.post("/register-admin", registerAdmin);
adminRouter.post("/login-admin", loginAdmin);

export default adminRouter;