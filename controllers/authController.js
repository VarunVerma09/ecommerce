import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) return res.status(400).send({ success: false, message: "Name is required" });
    if (!email) return res.status(400).send({ success: false, message: "Email is required" });
    if (!password) return res.status(400).send({ success: false, message: "Password is required" });
    if (!phone) return res.status(400).send({ success: false, message: "Phone is required" });
    if (!address) return res.status(400).send({ success: false, message: "Address is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please login.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user
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
