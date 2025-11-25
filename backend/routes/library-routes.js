import express from "express";
import Library from "../models/library-model.js";
import Book from "../models/book-model.js";



const router = express.Router();

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const books = await Library.findAll({
      where: { user_id },
      include: [{ model: Book }]
    });

    const formattedBooks = books.map(item => item.Book);

    res.json({
      success: true,
      books: formattedBooks
    });

  } catch (err) {
    console.error("Library Fetch Error:", err);
    res.status(500).json({ success: false, message: "Error loading library" });
  }
});

export default router;
