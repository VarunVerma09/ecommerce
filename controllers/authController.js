import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;



    // Validation
    if (!name) return res.status(400).send({ success: false, message: "Name is required" });
    if (!email) return res.status(400).send({ success: false, message: "Email is required" });
    if (!password) return res.status(400).send({ success: false, message: "Password is required" });
    if (!phone) return res.status(400).send({ success: false, message: "Phone is required" });
    if (!address) return res.status(400).send({ success: false, message: "Address is required" });
    if (!answer) return res.status(400).send({ success: false, message: "Answer is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false, // ✅ Fix: mark as false
        message: "Already registered. Please login.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
        
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

// test 
export const testController = async (req, res) => {
  res.send("Procted Route");
  
}

//Adim Access

export const isAdmin =  async (req,res,next) => {
try {
  const user = await userModel.findById(req.user._id);
  if(user.role !== 1){
    return res.status(401).send({
      success:false,
      message:"UnAuthorized Access"
    })
  }else{
    next();
  }
  
} catch (error) {
  console.log(error);
  res.status(401).send({
    success:false,
    error,
    message:"Error in MiddleWare"
  })
}
} 

//forgotPasswordController 
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Security answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }

    // ✅ Find user by email and answer
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // ✅ Hash new password and update
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
