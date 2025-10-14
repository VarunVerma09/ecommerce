import express from "express";
import { requireSignIn } from "../middleware/authMidd.js";
import { isAdmin } from "../controllers/authController.js";
import {createPostController} from "../controllers/postController.js"
import ExpressFormidable from "express-formidable";
const router = express.Router();

//routes 
router.post("/create-post",requireSignIn,ExpressFormidable(),isAdmin,createPostController)


export default router;