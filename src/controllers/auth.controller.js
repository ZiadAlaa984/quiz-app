import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";


const signup =  catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new AppError("Name, email, and password are required");
    }
    const userExist = await User.findOne({ email });

    if(userExist) {
        throw new AppError("User already exists!", 400);
    }    
    const newUser = await User.create({
        name,
        email,
        password,
        role: "user"
    });


     const token = await generateToken(newUser,process.env.JWT_SECRET);

    res.status(201).send({
        message: "User created successfully!",
        newUser,
        token
    });
})
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = await generateToken(user, process.env.JWT_SECRET);

    res.status(200).send({
        message: "Login successful!",
        user,
        token
    });

})
const Me = catchAsync(async (req, res) => {
    const user = req.user;
    
    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.status(200).send({
        message: "User found!",
        user
    });
})


export { signup, login, Me };