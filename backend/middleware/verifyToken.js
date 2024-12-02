import jwt from "jsonwebtoken";
import Usermodal from "../model/user_model.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const user = await Usermodal.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: User is not an admin" });
    }

    req.user = user; // Attach user to the request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAdmin;
