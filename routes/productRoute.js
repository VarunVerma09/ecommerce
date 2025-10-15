import express from "express";
import { requireSignIn } from "../middleware/authMidd.js";
import { isAdmin } from "../controllers/authController.js";
import {
  createProductController,
  deleteProductController,
  productPhotoController,
  getProductController,
  getSingleProductController,
  updateProductController
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  ExpressFormidable(),
  isAdmin,
  createProductController
);

//get all products

router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete Product
router.delete("/delete-product/:pid", deleteProductController);

//update products
router.put(
  "/update-product",
  requireSignIn,
  ExpressFormidable(),
  isAdmin,
  updateProductController
);

export default router;
