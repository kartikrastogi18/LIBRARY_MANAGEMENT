import addBookService from "../service/book-service.js";

const addBook = async (req,res)=>{
    try{
        const {name,author_id,category,language}=req.body;
        if(!name||!category||!language){
            return res.status(400).json({message:"please fill the required fields"})
        }
        console.log("--abc",name);
        
        const dataBook=await addBookService(name,author_id,category,language);
        console.log("--pq",dataBook);
        if(dataBook.success){
            return res.status(200).json({message:dataBook.message})
        }else{
            return res.status(400).json({message:dataBook.message}) 
        }
    }catch(err){
        console.log("er",err)
        return err;
    }
};
export default addBook;