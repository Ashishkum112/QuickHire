import { error, log, profile } from "console";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import exp from "constants";
import jwt from "jsonwebtoken" ;
import bodyParser from 'body-parser';
const { json } = bodyParser;
import dotenv from 'dotenv'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async(req,res) => {
    try{
        const {fullname,email,phoneNumber,password,role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:'User already exist with this email',
                success:false,
            })
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hasedPassword,
            role,
        })
        return res.status(201).json({
            message:"Account created successfully.",
            success: true
        })
    }
    catch(error){

    }
}
export const login = async(req,res) => {
    try{
        const {email,password,role} = req.body;
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role);
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false,
            })
        }
        // Debugging log for user password
        console.log('User password:', user.password);

        // Validate that user.password is defined
        if (!user.password) {
            return res.status(500).json({
                message: "Internal server error.",
                success: false,
            });
        }

        // Validate that user.password is defined
        if (!user.password) {
            return res.status(500).json({
                message: "Internal server error.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false,
            })
        };
        //check if role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role.",
                success:false
            })
        }
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY, {expiresIn:'1d'});

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000,httpsOnly:true , sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}
export const logout = async (req,res) => {
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Loggged out Succussfully.",
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}
export const updateProfile = async (req,res) =>{
    try{
        const {fullname,email,phoneNumber,bio,skills}= req.body;
        const file = req.file;
        
        
        // cloudinary will come here;
        
        
        const fileUri= getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        let skillsArray;
        if(skills){
        skillsArray = skills.split(",");
        }
        const userId =req.id; //middleware authentication
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        //updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
        
        

        //resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // Save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,

        }  
        return res.status(200).json({
            message:"Profile updated Succussfully",
            user,
            success:true
        })

    }catch(error){
    console.log(error);
}
}
