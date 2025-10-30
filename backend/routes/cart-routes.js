import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart-controller.js";

const router=express.Router();

router.post("/add",addToCart);
router.get("/:user_id",getCart);
router.delete("/remove",removeFromCart);

export default router;