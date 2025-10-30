import express from "express";
import { getProfile, login, signup, updateProfile, verify } from "../controllers/user-controller.js";

import authMiddleware from "../middleware/auth-middleware.js";

// import pkg from "jsonwebtoken";
// const { verify } = pkg;
const router = express.Router();
router.post("/signup", signup);
router.post("/verify", verify);
router.post("/login", login)
router.get("/profile/:id",getProfile);
router.put("/updateprofile/:id",updateProfile);
export default router;
