import { loginService, signupService } from "../service/user-service.js";

const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    console.log("-name", name, email);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "please fill the required fields" });
    }
    const data = await signupService(name, email, password, isAdmin);
    console.log("0----data", data);
    if (data.success) {
      return res.status(200).json({ message: data.message });
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (err) {
    return err;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("---emau", email)
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all reuireied" });
    }
    const data = await loginService(email, password);
    console.log("--data", data)
    if (data.success) {
      return res.status(200).json({ data: data.data, message: data.message });
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (err) {
    console.log("--errr", err)
    return err;
  }
};
export { login, signup };
