import express from "express";
import { registerController,loginController,isAdmin,testController } from '../controllers/authController.js'
import { requireSignIn } from "../middleware/authMidd.js";

const router = express.Router()

//register route
router.post('/register',registerController);

//Login route
router.post('/login',loginController);

//test route
router.post('/test',requireSignIn , isAdmin,testController);

router.get("/user-auth", requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});




export default router;