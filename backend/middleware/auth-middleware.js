import jwt from "jsonwebtoken";
const authMiddleware=(req,res,next)=>{
    try{
        const token=req.headers.authorization
        if(!token){
            return res.status(400).json({message:"tokrn not found"});
            
        }
        const dec=token.split(" ")[1];
        const decode=jwt.verify(dec,"kartik")
        console.log("..s",decode);
        
        req.id=decode.id;
        next();
    }catch(err){
        return err;
    }
}
export default authMiddleware;