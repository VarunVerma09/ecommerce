import express from "express";
import { requireSignIn } from "../middleware/authMidd.js";
import { isAdmin } from "../controllers/authController.js";
import { createCategoryController, updateCategoryController } from "../controllers/categoryController.js";


const router = express.Router();


//route to create category 
router.post("/create-category",requireSignIn,isAdmin,createCategoryController);


//route to update category 
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);


export default router;