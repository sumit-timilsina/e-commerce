import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.status(200).json({ user, token });
        }
        else {
            return res.status(400).json({ message: "Invalid credentials" });
        }


    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //validate email and pass
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if (password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword,
        });
        const user = await newUser.save();

        //create token
        const token = createToken(user._id);

        return res.status(201).json({user,token});
        
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

const adminLogin = async (req, res) => {
}

export {loginUser, registerUser, adminLogin}