import Library from "../models/library-model.js";
import Book from "../models/book-model.js";

export const getMyBooks = async (req, res) => {
  try {
    const { user_id } = req.params;

    const books = await Library.findAll({
      where: { user_id },
      include: [
        {
          model: Book,
          attributes: [
            "id",
            "name",
            "author_name",
            "category",
            "language",
            "description",
            "image_url",
            "published_on",
            "price"
          ]
        }
      ]
    });

    res.status(200).json({
      success: true,
      books
    });
  } catch (err) {
    console.error("Library Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching books"
    });
  }
};
