import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import User from "../models/user.model.js";

const router = express.Router();

const getUseForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password -email -createdAt -updatedAt -__v");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUseForSidebar:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

router.get("/users", protectRoute, getUseForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
