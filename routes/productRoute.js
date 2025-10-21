import express from "express";
import { requireSignIn } from "../middleware/authMidd.js";
import { isAdmin } from "../controllers/authController.js";
import {
  createProductController,
  deleteProductController,
  productPhotoController,
  getProductController,
  getSingleProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(), 
  createProductController
);
//get all products

router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete Product
router.delete("/delete-product/:pid", deleteProductController);

//update products
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//filer product

router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);


export default router;
