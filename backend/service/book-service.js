import Book from "../models/book-model.js";
const addBookService = async(name,author_id,category,language)=>{
    try{
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