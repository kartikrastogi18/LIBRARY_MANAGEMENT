import Cart from "../models/cart.js";
import Library from "../models/library-model.js";

export const purchaseBook=async(req,res)=>{
    try{
        const{user_id}=req.body;
        const cartItem=await Cart.findAll({
            where:{user_id,is_Purchased:false},
        });
        if(cartItem.length===0){
            return res.status(400).json({ success: false, message: "No books to purchase!" });
        }
        for(const items of cartItem){
            items.is_Purchased=true;
            await items.save();
            await Library.create({
                user_id:items.user_id,
                book_id:items.book_id
            });
        }
        res.status(200).json({
            success: true,
            message: "Books marked as purchased and added to library successfully!",
          });
    }catch(err){
        return err;
    }
} 
export const addToCart=async(req,res)=>{
    try{
        const {user_id,book_id} =req.body;
        let cartItem = await Cart.findOne({
            where:{user_id,book_id}
        });
        if(cartItem){
            cartItem.quantity+=1;
            await cartItem.save();
            return res.status(200).json({success:true,message:"Book quantity updated in cart"})
        }
        await Cart.create({user_id,book_id});
        res.status(200).json({success:true,message:"Book added to cart successfully"})
    }
    catch(err){
        return err;
    }
}
export const getCart=async(req,res)=>{
    try{
        const{user_id}=req.params;
        const cartItem=await Cart.findAll({
            where:{user_id},
            include:["Book"]
        });
        res.json(cartItem);
    }catch(err){
        return err;
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;
        const deleted = await Cart.destroy({ where: { user_id, book_id } });
        if (deleted)
            return res.json({ message: "Book removed from cart!" });
        else
            return res.status(404).json({ message: "Book not found in cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing from cart" });
    }
};