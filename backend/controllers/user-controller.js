// import { loginService, signupService } from "../service/user-service.js";
// import authMiddleware from "../middleware/auth-middleware.js";

// import User from "../models/user-model.js";
// import Library from "../models/library-model.js";
// import Book from "../models/book-model.js";


//  const getMyBooks = async (req, res) => {
//   try {
//     const { id } = req.params; // user id

//     const myBooks = await Library.findAll({
//       where: { user_id: id },
//       include: [
//         {
//           model: Book,
//           attributes: [
//             "id",
//             "name",
//             "author_name",
//             "category",
//             "language",
//             "description",
//             "published_on"
//           ],
//         },
//       ],
//       order: [["purchased_at", "DESC"]],
//     });

//     if (myBooks.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No purchased books found for this user.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       totalBooks: myBooks.length,
//       books: myBooks,
//     });
//   } catch (error) {
//     console.error("Error fetching My Books:", error);
//     res.status(500).json({ success: false, message: "Error fetching My Books" });
//   }
// };

// const verify = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const record = await User.findOne({ where: { email } });
//     if (!record)
//       return res.status(400).json({ success: false, message: "OTP not found" });

//     // if (Date.now() > record.expiresAt) {
//     //   otpStore.delete(email);
//     //   return res.status(400).json({ success: false, message: "OTP expired" });
//     // }

//     if (Number(record.otp) !== Number(otp))
//       return res.status(400).json({ success: false, message: "Invalid OTP" });

//     await User.update({ is_otp_verified: true }, { where: { email } });

//     return res.status(200).json({
//       success: true,
//       message: "OTP verified. Signup successful!",
//     });
//   } catch (err) {
//     console.error("OTP Verification Error:", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

// const getProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     console.log("...use", userId);
//     const user = await User.findByPk(userId, {
//       attributes: ["id", "name", "email", "is_admin", "created_at"],
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, data: user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// const updateProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { name, email, password } = req.body;

//     const user = await User.findByPk(userId);

//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });

//     await user.update({
//       name: name || user.name,
//       email: email || user.email,
//       password: password || user.password,
//       updated_at: new Date(),
//     });

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Profile updated successfully",
//         data: user,
//       });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ success: false, message: "Server Error" });
//   }
// };
// const signup = async (req, res) => {
//   try {
//     const { name, email, password, isAdmin } = req.body;
//     console.log("-name", name, email);
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "please fill the required fields" });
//     }
//     const data = await signupService(name, email, password, isAdmin);
//     console.log("0----data", data);
//     if (data.success) {
//       return res.status(200).json({ message: data.message, id: data.id });
//     } else {
//       return res.status(400).json({ message: data.message });
//     }
//   } catch (err) {
//     return err;
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("---emau", email);
//     if (!email || !password) {
//       return res.status(400).json({ message: "Fill all reuireied" });
//     }
//     const data = await loginService(email, password);
//     console.log("--data", data);
//     if (data.success) {
//       return res
//         .status(200)
//         .json({
//           token: data.data,
//           message: data.message,
//           isAdmin: data.isAdmin,
//         });
//     } else {
//       return res.status(400).json({ message: data.message });
//     }
//   } catch (err) {
//     console.log("--errr", err);
//     return err;
//   }
// };
// export { login, signup, getProfile, updateProfile, verify ,getMyBooks};
import { loginService, signupService } from "../service/user-service.js";
import User from "../models/user-model.js";
import Library from "../models/library-model.js";
import Book from "../models/book-model.js";

export const getMyBooks = async (req, res) => {
  try {
    const { id } = req.params; // user id

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const myBooks = await Library.findAll({
      where: { user_id: id },
      include: [
        {
          model: Book,
          attributes: [
            "id",
            "name",
            "author_name",
            "category",
            "language",
            "description",
            "published_on"
          ],
        },
      ],
      order: [["purchased_at", "DESC"]],
    });

    if (myBooks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No purchased books found",
        totalBooks: 0,
        books: []
      });
    }

    res.status(200).json({
      success: true,
      totalBooks: myBooks.length,
      books: myBooks,
    });
  } catch (error) {
    console.error("Error fetching My Books:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching My Books" 
    });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and OTP are required" 
      });
    }

    const record = await User.findOne({ where: { email } });
    
    if (!record) {
      return res.status(400).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (Number(record.otp) !== Number(otp)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    await User.update({ is_otp_verified: true }, { where: { email } });

    return res.status(200).json({
      success: true,
      message: "OTP verified. Signup successful!",
    });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "is_admin", "created_at"],
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: user 
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      updated_at: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(400).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please fill all required fields" 
      });
    }

    const data = await signupService(name, email, password, isAdmin);

    if (data.success) {
      return res.status(200).json({ 
        success: true,
        message: data.message, 
        id: data.id 
      });
    } else {
      return res.status(400).json({ 
        success: false,
        message: data.message 
      });
    }
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error during signup" 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    const data = await loginService(email, password);

    if (data.success) {
      return res.status(200).json({
        success: true,
        token: data.data,
        message: data.message,
        isAdmin: data.isAdmin,
        userId: data.userId
      });
    } else {
      return res.status(400).json({ 
        success: false,
        message: data.message 
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error during login" 
    });
  }
};

// export { login, signup, getProfile, updateProfile, verify, getMyBooks};