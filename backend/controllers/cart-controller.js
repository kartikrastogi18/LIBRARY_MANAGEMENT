// import Cart from "../models/cart.js";
// import Library from "../models/library-model.js";

// export const purchaseBook=async(req,res)=>{
//     try{
//         const{user_id}=req.body;
//         const cartItem=await Cart.findAll({
//             where:{user_id,is_Purchased:false},
//         });
//         if(cartItem.length===0){
//             return res.status(400).json({ success: false, message: "No books to purchase!" });
//         }
//         for(const items of cartItem){
//             items.is_Purchased=true;
//             await items.save();
//             await Library.create({
//                 user_id:items.user_id,
//                 book_id:items.book_id
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Books marked as purchased and added to library successfully!",
//           });
//     }catch(err){
//         return err;
//     }
// } 
// export const addToCart=async(req,res)=>{
//     try{
//         const {user_id,book_id} =req.body;
//         let cartItem = await Cart.findOne({
//             where:{user_id,book_id}
//         });
//         if(cartItem){
//             cartItem.quantity+=1;
//             await cartItem.save();
//             return res.status(200).json({success:true,message:"Book quantity updated in cart"})
//         }
//         await Cart.create({user_id,book_id});
//         res.status(200).json({success:true,message:"Book added to cart successfully"})
//     }
//     catch(err){
//         return err;
//     }
// }
// export const getCart=async(req,res)=>{
//     try{
//         const{user_id}=req.params;
//         const cartItem=await Cart.findAll({
//             where:{user_id},
//             include:["Book"]
//         });
//         res.json(cartItem);
//     }catch(err){
//         return err;
//     }
// };
// export const removeFromCart = async (req, res) => {
//     try {
//         const { user_id, book_id } = req.body;
//         const deleted = await Cart.destroy({ where: { user_id, book_id } });
//         if (deleted)
//             return res.json({ message: "Book removed from cart!" });
//         else
//             return res.status(404).json({ message: "Book not found in cart" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error removing from cart" });
//     }
// };
import Cart from "../models/cart.js";
import Library from "../models/library-model.js";
import Book from "../models/book-model.js";

export const purchaseBook = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    const cartItems = await Cart.findAll({
      where: { user_id, is_Purchased: false },
      include: [{ model: Book }]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No books to purchase!" 
      });
    }

    // Check if books already exist in library
    const bookIds = cartItems.map(item => item.book_id);
    const existingLibraryBooks = await Library.findAll({
      where: { user_id, book_id: bookIds }
    });

    const existingBookIds = existingLibraryBooks.map(lib => lib.book_id);

    // Mark cart items as purchased and add to library
    for (const item of cartItems) {
      item.is_Purchased = true;
      await item.save();

      // Only add to library if not already there
      if (!existingBookIds.includes(item.book_id)) {
        await Library.create({
          user_id: item.user_id,
          book_id: item.book_id
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Books purchased and added to library successfully!",
      purchasedCount: cartItems.length
    });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error processing purchase" 
    });
  }
};

export const addToCart = async (req, res) => {
  try {

    const { user_id, book_id } = req.body;  // <-- THIS MUST BE VERY FIRST!

    console.log("USER:", user_id, "BOOK:", book_id);

    if (!user_id || !book_id) {
      return res.status(400).json({
        success: false,
        message: "User ID and Book ID are required",
      });
    }


    // Check if book exists
    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: "Book not found" 
      });
    }

    // Check if book already in library
    const inLibrary = await Library.findOne({
      where: { user_id, book_id }
    });

    if (inLibrary) {
      return res.status(400).json({ 
        success: false, 
        message: "Book already in your library" 
      });
    }

    // Check if already in cart
    let cartItem = await Cart.findOne({
      where: { user_id, book_id, is_Purchased: false }
    });

    if (cartItem) {
      return res.status(400).json({ 
        success: false, 
        message: "Book already in cart" 
      });
    }

    // Add to cart
    await Cart.create({ user_id, book_id, quantity: 1 });

    res.status(200).json({ 
      success: true, 
      message: "Book added to cart successfully" 
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error adding to cart" 
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    const cartItems = await Cart.findAll({
      where: { user_id, is_Purchased: false },
      include: [{
        model: Book,
        attributes: [
          "id", 
          "name", 
          "author_name", 
          "category", 
          "language", 
          "description", 
          "published_on"
        ]
      }],
      order: [["created_at", "DESC"]]
    });

    res.status(200).json({ 
      success: true, 
      totalItems: cartItems.length,
      cart: cartItems 
    });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching cart" 
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID and Book ID are required" 
      });
    }

    const deleted = await Cart.destroy({ 
      where: { user_id, book_id, is_Purchased: false } 
    });

    if (deleted) {
      return res.status(200).json({ 
        success: true, 
        message: "Book removed from cart successfully" 
      });
    } else {
      return res.status(404).json({ 
        success: false, 
        message: "Book not found in cart" 
      });
    }
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error removing from cart" 
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    await Cart.destroy({ 
      where: { user_id, is_Purchased: false } 
    });

    res.status(200).json({ 
      success: true, 
      message: "Cart cleared successfully" 
    });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error clearing cart" 
    });
  }
};