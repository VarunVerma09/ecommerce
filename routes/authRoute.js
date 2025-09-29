import express from "express";
import { registerController,loginController,testController, isAdmin } from '../controllers/authController.js'
import { requireSignIn } from "../middleware/authMidd.js";

const router = express.Router()

//register route
router.post('/register',registerController);

//Login route
router.post('/login',loginController);

//test route
router.post('/test',requireSignIn , isAdmin,testController);






export default router;