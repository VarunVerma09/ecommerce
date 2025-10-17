import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };


export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // ✅ Remove "Bearer " prefix if present
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ Verify the token with your secret
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    // ✅ Attach the decoded user info (e.g., { _id: ... }) to req.user
    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};