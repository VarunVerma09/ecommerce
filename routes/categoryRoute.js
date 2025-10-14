import express from "express";
import { requireSignIn } from "../middleware/authMidd.js";
import { isAdmin } from "../controllers/authController.js";
import { createCategoryController, updateCategoryController, CategoryController,singleCategoryController,deleteCategoryController } from "../controllers/categoryController.js";


const router = express.Router();


//route to create category 
router.post("/create-category",requireSignIn,isAdmin,createCategoryController);


//route to update category 
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);


//get all category 
router.get("/get-category",CategoryController);

//single categroy 
 router.get("/single-category/:slug",singleCategoryController);

//delete category
 router.delete("/delete-category/:id",isAdmin,requireSignIn,deleteCategoryController);



export default router;