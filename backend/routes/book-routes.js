import express from "express";
import { addBook, listBook } from "../controllers/book-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = express.Router();
router.post("/addbook", authMiddleware,addBook);
router.get("/listBook",listBook);



export default router;