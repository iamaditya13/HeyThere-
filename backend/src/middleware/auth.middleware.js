import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({message: "Not authorized, no token"})
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({message: "Not authorized, token failed"})
    }
    const user = await User.findById(decoded.id).select("-password");
    if(!user){
      return res.status(404).json({message: " User not found"})
    }
    req.user = user;
    next();
  }
  catch (error) {
    console.log("Error in protectRoute:", error);
    return res.status(500).json({message: "Server error"})
  }
}
