import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    await User.create({ name, email, password: hash, is_admin: isUserAdmin });
    return { success: true, message: "signup successfully" };
  } catch (err) {
    return err;
  }
};

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
    const isMatch =await bcrypt.compare(password, existingUser.password);
    console.log("--isMatch", isMatch)
    if (!isMatch) {
      return { success: false, message: "Incorrect Password" };
    }
    const token = await createToken(existingUser.id);
    console.log("--token", token)
    return { success: true, data: token, message: "Login Successful" };
  } catch (err) {
    console.log("--err", err)
    return err;
  }
};
export { signupService, loginService };
