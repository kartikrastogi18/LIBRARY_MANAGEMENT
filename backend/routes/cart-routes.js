import express from "express";
import { addToCart, getCart, purchaseBook, removeFromCart } from "../controllers/cart-controller.js";

const router=express.Router();

router.post("/add",addToCart);
router.get("/:user_id",getCart);
router.post("/remove",removeFromCart);
router.post("/purchase",purchaseBook);


export default router;