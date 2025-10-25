import express from "express";
import { getProfile, login, signup, updateProfile } from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login)
router.get("/profile/:id",getProfile);
router.put("/updateprofile/:id",updateProfile);
export default router;
