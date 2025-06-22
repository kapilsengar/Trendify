import User from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { gentoken, genToken1 } from "../config/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    console.log(user)
    return res.status(201).json(user);
  } catch (error) {
    console.log("register error", error);
    return res.status(500).json({ message: `Register error: ${error.message}` });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" }); // ✅ Corrected
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" }); // ✅ Corrected
    }

    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3 * 24 * 60 * 60 * 1000 // ✅ 3 days in milliseconds
    });

    console.log("Login success:", user);

    return res.status(200).json({ message: "Login Successful", user }); // ✅ status 200 for login
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};


export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("logout error")
        return res.status(500).json({message:`Logout error ${error}`})
    }
}

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate incoming data
    if (!email || !name) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    // If not, create a new user
    if (!user) {
      user = await User.create({ name, email });
    }

    // Generate JWT token
    const token = await gentoken(user._id);

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });

    return res.status(200).json({
      message: "Google login successful",
      user,
    });

  } catch (error) {
    console.error("googleLogin error:", error);
    return res.status(500).json({ message: `Google login error: ${error.message}` });
  }
};

export const adminLogin = async (req,res) => {
    try {
        let {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        let token = await genToken1(email)
        res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(token)
    
        }
        return res.status(400).json({message:"Invaild creadintials"})

    } catch (error) {
        console.log("AdminLogin error")
    return res.status(500).json({message:`AdminLogin error ${error}`})
        
    }
    
}

