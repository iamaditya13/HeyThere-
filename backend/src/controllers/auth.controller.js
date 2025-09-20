import { generateToken } from "../lib/utils.js";
import User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if(!email || !password || !fullName){
      return res.status(400).json({message: "Please provide all required fields"})
    }
    if(password.length < 6){  
      return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({message: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName
    })

    if(newUser){
      generateToken(newUser._id, res)
      await newUser.save()
      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
      })
    } else {
      return res.status(400).json({message: "Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup:", error);
    return res.status(500).json({message: "Server error"})
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({message: "Please provide all required fields"})
    }
    const user   = await User.findOne({email})
    if(!user){
      return res.status(400).json({message: "Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({message: "Invalid credentials"})
    }   
    generateToken(user._id, res)
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    })
  } catch (error) {
    console.log("Error in login:", error);
    return res.status(500).json({message: "Server error"})
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0
    });
    return res.status(200).json({message: "Logged out successfully"})
  } catch (error) {
    console.log("Error in logout:", error);
    return res.status(500).json({message: "Server error"})
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in checkAuth:", error);
    return res.status(500).json({ message: "Server error" });
  } 
}