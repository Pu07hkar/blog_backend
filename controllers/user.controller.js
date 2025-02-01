import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Blog from "../models/vlog.model.js"
import jwt from "jsonwebtoken"


const register = async (req,res)=>{
    try {
        const {name , fullName, email, password}= req.body
        if(!name || !fullName || !email || !password){
            return res.status(400).json({message: "all fields are required"})
        }

        const exists = await User.findOne({email})
        if(exists){
            return res.status(400).json({message: "user already exists with this email"})
        }

        const hashedPassword = await bcryptjs.hash(password, 8)

        const newUser = new User({
            name,
            fullName,
            email,
            password: hashedPassword
        })

        await newUser.save();
        return res.status(200).json({message: "new user is created successfully"})
    } catch (error) {
        console.log(`error ${error}`)
    }
}
const login = async (req,res)=>{
    try {
        const {email,password}= req.body;


        if(!password || !email){
            return res.status(400).json({message: "password and email is required"})
        }

        

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user do not found"})
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);
        if(!verifyPassword){
            return res.status(400).json({message: "wrong password"})
        }

        const token = jwt.sign({userID : user._id}, process.env.SECRET_KEY, {expiresIn: "1h"})

        res.cookie("authToken",token,{httpOnly: true , secure: false})

        return res.status(200).json({message:"you are logged in", user, token});


    } catch (error) {
        console.log(`error : ${error}`)
    }
}

const postBlog = async (req,res)=>{
    const {_id} = req.param;
    const {title,description} = req.body;

    if(!title || !description){
        return res.status(400).json({message: "id or title or description is required"})
    }

    const newBlog = new Blog({auther: _id , title:title, description: description})
    await newBlog.save();
    return res.status(200).json({message: "new blog is created successfully"})
}

const logout = async(req,res)=>{
    try {
        // req.header("Autherization") = "1";
        res.clearCookie("authToken");
        return res.json({message:"logged out successfully"})
    } catch (error) {
        console.log(`error ${error}`)
    }
}
export {register, login,postBlog,logout}