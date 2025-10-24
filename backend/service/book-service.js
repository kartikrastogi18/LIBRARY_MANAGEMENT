import Book from "../models/book-model.js";
import User from "../models/user-model.js";

const addBookService = async(name,author_id,category,language)=>{
    try{
        const user=await User.findOne({where:{id:author_id}})
        if(!user.is_admin){
            return {success:false,message:"is not admin"}
        }
        const existingBook =await Book.findOne({where:{name}});
        if(existingBook) {
            return {success:false,message:"book already exist"}
        }else{
            await Book.create({name,author_id,category,language});
            return {success:true,message:"book added successfully"}
        }
    }catch(err){
        return err;
    }
}
export default addBookService;