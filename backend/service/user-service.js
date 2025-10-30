import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOTP } from "./send-mail-service.js";

// const profileService=async(id,name,email,is_admin,created_at)=>{
//   try{
//     const userId = req.params.id;
//     const user = await User.findByPk(userId, {
//       attributes: ["id", "name", "email", "is_admin", "created_at"]
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, data: user });
//   }catch(err){
//     return err;
//   }
// }

const signupService = async (name, email, password, isAdmin) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log("000existingUserexistingUser", existingUser);
    if (existingUser) {
      return { success: false, message: "User already exits" };
    }
    console.log("------------------------");
    const hash = await bcrypt.hash(password, 10);
    let isUserAdmin = false;
    if (isAdmin) {
      isUserAdmin = true;
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    const data = await sendOTP(email, otp);

    const userdata=await User.create({ name, email, password: hash, is_admin: isUserAdmin , otp,is_otp_verified:false});

    return { success: true, message: "OTP verified, signup successful",id:userdata?.id };
  } catch (err) {
    return err;
  }
};
// const verify=async(req,res)=>{
//   try{
//     const{email,otp} =req.body;
//     const record=otpStore.get(email);
//     if(!record) return res.status(400).json({success:false,message:"OTP NOT FOUND"});
//     if(Date.now()>record.expiresAt) res.status(400).json({success:false,message:"OTP Expired"});
//     if(record.otp!==otp) res.status(400).json({success:false,message:"Invalid OTP"});
//     const {name,hash,isUserAdmin}=record.data;
//     await User.create({ name, email, password: hash, is_admin: isUserAdmin });
//     otpStore.delete(email);
//     return res.status(200).json({ success: true, message: "OTP verified, signup successful" });
//   } catch (err) {
//     console.error("OTP Verification Error:", err);
//     return res.status(400).json({ success: false, message: "Internal Server Error" });
//   }
// };

const createToken = (userId) => {
  const token = jwt.sign({ id: userId }, "kartik");
  return token;
};

const loginService = async (email, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return { success: false, message: "Please signup" };
    }
    if(existingUser.is_otp_verified==false){
      return { success: false, message: "OTP not verified" };
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log("--isMatch", isMatch);
    if (!isMatch) {
      return { success: false, message: "Incorrect Password" };
    }
    const token = await createToken(existingUser.id);
    console.log("--token", token);
    return {
      success: true,
      data: token,
      message: "Login Successful",
      isAdmin: existingUser?.is_admin,
    };
  } catch (err) {
    console.log("--err", err);
    return err;
  }
};
export { signupService, loginService };
