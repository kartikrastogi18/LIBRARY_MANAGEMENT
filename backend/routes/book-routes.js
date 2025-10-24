import express from "express";
import { addBook, deletebook, listBook, updatebook } from "../controllers/book-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = express.Router();
router.post("/addbook", authMiddleware,addBook);
router.get("/listBook",listBook);
router.put("/update",authMiddleware,updatebook);
router.delete("/delete",authMiddleware,deletebook);



export default router;