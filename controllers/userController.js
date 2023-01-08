import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {comparePass } from "../lib/auth.js";
import authToken from "../helper/generateToken.js";

export const registerUser = async (req, res, next)=>{

    console.log(req.body);
    console.log(req.file);

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(421).json({errors:errors.array().map(err=>err.msg)})
        }

        const {username, email, password} = req.body;

        //check if user is already registered

        const isUserEmailInDB = await User.findOne({email});

        if(isUserEmailInDB){
            return res.status(400).json({msg: "You already have an account"})
        }

        const newUser = await User.create({
            email,
            password,
            username,
            userPic: "/uploads/images/" + req.file.filename,
          });

          //generate jwt token - authentication / later, to authorise, we need to verify the token 
          const payload = {id: newUser._id}

          const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "1d"})

          //send it with http

          res.cookie("access_token", token, {httpOnly: true})

      
          res
            .status(200)
            .json({msg: "you registered successfully", user: newUser._id});

    } catch (error) {
        next(error)
    }
};

export const loginUser = async (req, res, next)=>{

    try {

        const {email, password} = req.body;

        if (!email || !password){
           return res.status(401).json({msg: "Please login with email and password"})
        }

        const user = await User.findOne({email});
    
        if(!user) {
            return res.status(401).json({msg:"You are not in our app"})
        };
    
        
    
        if (await comparePass(password, user.password)) {

            //generate jwt token using a helper

            const token = await authToken.generateToken(user)
            console.log(token);

            //send it with http

            res.cookie("access-token", token, {httpOnly: true}).json({msg: "You loggen in successfully"})
            return
            
        };
    
        res.status(403).json({msg: "Please check your email and password"})
        
    } catch (error) {
        next(error)
    }
};

export const getAllUsers = async (req, res, next)=>{
    const allUsers = await User.find()

    res.status(200).json({msg: "Here is the user list:", allUsers})
}