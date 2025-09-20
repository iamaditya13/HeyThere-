import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage,getUseForSidebar } from "../controllers/message.controller.js";
import User from "../models/user.model.js";

const router = express.Router();


router.get("/users", protectRoute, getUseForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
