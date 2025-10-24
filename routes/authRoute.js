import express from "express";
import { registerController,loginController,isAdmin,testController,forgotPasswordController,allUserController, updateProfileController, getOrdersController } from '../controllers/authController.js'
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
router.get("/admin-auth", requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//forgot password
router.post("/forgot-password",forgotPasswordController);

//all users
router.get("/all-users",requireSignIn,isAdmin,allUserController)

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);




export default router;