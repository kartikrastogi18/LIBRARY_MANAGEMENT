import addBookService from "../service/book-service.js";
import Book from "../models/book-model.js";
import authMiddleware from "../middleware/auth-middleware.js";
const listBook = async (req, res) => {
    try {
        const { language, category, author_id} = req.query;
        let filters={};
        if(language) filters.language=language;
        console.log("ghj")
    console.log(";;;",language);
    if(category) filters.category=category;
    if(author_id) filters.author_id=author_id;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    console.log("hj",offset);
    const { count, rows } = await Book.findAndCountAll({ where :filters, order: [["published_on", "DESC"]],limit, offset });
    res.json({
      success: true,
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (err) {
    console.log("dfghj",err)
    return err;
  }
};
const addBook = async (req, res) => {
  try {
    const { name, category, language } = req.body;
    const author_id = req.id;
    console.log(author_id);
    if (!name || !category || !language) {
      return res
        .status(400)
        .json({ message: "please fill the required fields" });
    }
    console.log("--abc", name);

    const dataBook = await addBookService(name, author_id, category, language);
    console.log("--pq", dataBook);
    if (dataBook.success) {
      return res.status(200).json({ message: dataBook.message });
    } else {
      return res.status(400).json({ message: dataBook.message });
    }
  } catch (err) {
    console.log("er", err);
    return err;
  }
};
export { addBook, listBook };
