import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
const authenticated = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
         throw new AppError("Not authenticated", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
         throw new AppError("No token provided", 401);
    }

    const userId = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(userId.id);

    req.user = user;

    next();
};

export default authenticated;