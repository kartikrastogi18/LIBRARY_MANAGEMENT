// import addBookService from "../service/book-service.js";
// import { Op } from "sequelize";
// import Book from "../models/book-model.js";
import authMiddleware from "../middleware/auth-middleware.js";
// import User from "../models/user-model.js";
// const getBook=async(req,res)=>{
//   try{
//     const id = req.params.id;
//     console.log("--id", id)
//     const book=await Book.findByPk(id);
//     console.log("--book", book)
//     if(!book){
//       return res.status(400).json({success:false,message:"Book Not Found"});
//     }
//     res.status(200).json({success:true,data:book})
//   }catch(err){
//     return err;
//   }
// }
// const deletebook=async(req,res)=>{
//   try{
//     const author_id=req.id;
//     const user=await User.findOne({where:{id:author_id}});
//     if(!user.is_admin){
//       return res.status(400).json({success:false,message:"is not admin"});
//     }
//     const {id}=req.query;
//     const book = await Book.findByPk(id);
//     await book.destroy();
//     res.status(200).json({success:true,message:"Book Deleted Successfully!!"});
//   }catch(err){
//     return err;
//   }
// }
// const updatebook = async (req, res) => {
//   try {
//     const author_id = req.id;
//     const user=await User.findOne({where:{id:author_id}})
//         if(!user.is_admin){
//             return res.status(400).json({success:false,message:"is not admin"})
//         }
//     const { id } = req.query;
//     const { name, language, category, published_on, description, author_name} = req.body;
//     const book = await Book.findByPk(id);
//     if (!book) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Book Not Found!!" });
//     }
//     await book.update({
//       name: name || book.name,
//       language: language || book.language,
//       category: category || book.category,
//       author_id: author_id || book.author_id,
//       description: description|| book.description,
//       author_name: author_name|| book.author_name,
//       published_on: published_on || book.published_on,
//       updated_at: new Date(),
//     });
//     res
//       .status(200)
//       .json({ success: true, message: "book updated successfully" });
//   } catch (err) {
//     return err;
//   }
// };
// const listBook = async (req, res) => {
//   try {
//     const { name, language, category, published_on, description, author_name, author_id } = req.query;

//     let filters = {};
//     if (language) filters.language = language;
//     if (author_name) filters.author_name = author_name;
//     if (name)  filters.name = { [Op.iLike]: `%${name}%` };
//     console.log("ghj");
//     console.log(";;;", language);
//     if (category) filters.category = category;
//     if (author_id) filters.author_id = author_id;

//     let page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 10;
//     let offset = (page - 1) * limit;
//     console.log("hj", offset);
//     const { count, rows } = await Book.findAndCountAll({
//       where: filters,
//       order: [["published_on", "DESC"]],
//       limit,
//       offset,
//     });
//     res.json({
//       success: true,
//       totalRecords: count,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//       data: rows,
//     });
//   } catch (err) {
//     console.log("dfghj", err);
//     return err;
//   }
// };
// const addBook = async (req, res) => {
//   try {
//     const { name, category, language ,description,author_name} = req.body;
//     const author_id = req.id;
//     console.log(author_id);
//     if (!name || !category || !language ||! description ||!author_name) {
//       return res
//         .status(400)
//         .json({ message: "please fill the required fields" });
//     }
//     console.log("--abc", name);

//     const dataBook = await addBookService(name, author_id, category, language,description,author_name);
//     console.log("--pq", dataBook);
//     if (dataBook.success) {
//       return res.status(200).json({ message: dataBook.message });
//     } else {
//       return res.status(400).json({ message: dataBook.message });
//     }
//   } catch (err) {
//     console.log("er", err);
//     return err;
//   }
// };
// export { addBook, listBook ,updatebook,deletebook,getBook};
import addBookService from "../service/book-service.js";
import { Op } from "sequelize";
import Book from "../models/book-model.js";
import User from "../models/user-model.js";

export const getBook = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required"
      });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (err) {
    console.error("Get book error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching book"
    });
  }
};

export const deletebook = async (req, res) => {
  try {
    const author_id = req.id;
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required"
      });
    }

    const user = await User.findOne({ where: { id: author_id } });

    if (!user || !user.is_admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access required"
      });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    await book.destroy();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (err) {
    console.error("Delete book error:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting book"
    });
  }
};

export const updatebook = async (req, res) => {
  try {
    const author_id = req.id;
    const { id } = req.query;
    const { name, language, category, published_on, description,price, author_name } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required"
      });
    }

    const user = await User.findOne({ where: { id: author_id } });

    if (!user || !user.is_admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access required"
      });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    await book.update({
      name: name || book.name,
      language: language || book.language,
      category: category || book.category,
      author_id: author_id || book.author_id,
      description: description || book.description,
      price:price||book.price,
      author_name: author_name || book.author_name,
      published_on: published_on || book.published_on,
      updated_at: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book
    });
  } catch (err) {
    console.error("Update book error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating book"
    });
  }
};

export const listBook = async (req, res) => {
  try {
    const { name, language, category, published_on, description, author_name, author_id } = req.query;

    let filters = {};
    if (language) filters.language = language;
    if (author_name) filters.author_name = author_name;
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (category) filters.category = category;
    if (author_id) filters.author_id = author_id;
    if (description) filters.description = { [Op.iLike]: `%${description}%` };

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;

    const { count, rows } = await Book.findAndCountAll({
      where: filters,
      order: [["published_on", "DESC"]],
      limit,
      offset,
    });

    res.json({
      success: true,
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (err) {
    console.error("List books error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching books"
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const { name, category, language, description, author_name ,price} = req.body;
    const author_id = req.id;

    if (!name || !category || !language || !description || !author_name) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const dataBook = await addBookService(
      name,
      author_id,
      category,
      language,
      description,
      price,
      author_name
    );

    if (dataBook.success) {
      return res.status(200).json({
        success: true,
        message: dataBook.message,
        data: dataBook.data
      });
    } else {
      return res.status(400).json({
        success: false,
        message: dataBook.message
      });
    }
  } catch (err) {
    console.error("Add book error:", err);
    res.status(500).json({
      success: false,
      message: "Error adding book"
    });
  }
};

// export { addBook, listBook, updatebook, deletebook, getBook };