import bcrypt from "bcryptjs";
import UserModal from "../model/user_model.js"; 
import jwt from "jsonwebtoken"

const register = async (req, res) => {
  try {
    const { name, email, password, role  } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, and password",
      });
    }

   
    const existUser = await UserModal.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please log in instead.",
      });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new UserModal({
      name,
      email,
      password: hashedPassword,
      role,
    });

   
    await newUser.save();

 
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error in register:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide both email and password",
        });
      }
  
      // Find the user by email
      const user = await UserModal.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found. Please register first.",
        });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Authentication successful
     
const token=jwt.sign({userId:user._id},process.env.JWT_SEC)

res.cookie('token',token,{
    httpOnly:true,
    secure:false


})
res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  },user,token);


    } catch (error) {
      console.error("Error in login:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
 
 const Logout=async(req,res)=>{

try {
    res.clearCookie('token')
    res.status(200).json({message:"user Logout successfully"})
} catch (error) {
    
    res.status(500).json({success:false,message:"'internal server err while logout"})
}

 }

 const CheckUser=async(req,res)=>{
  try {
      const user=req.user
      if (!user) {
          res.status(404).json({message:'User not found'})
      }
      res.status(200).json(user)

      
  } catch (error) {
      res.status(500).json({message:"internal server error"})
      console.log(error)
      
  }
}






export   {register, login,Logout,CheckUser};
