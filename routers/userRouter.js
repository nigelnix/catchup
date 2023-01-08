import express from "express";
import {registerUser, loginUser, getAllUsers} from "../controllers/userController.js";
import {userValidator} from "../middleware/userValidator.js";
import authToken from "../helper/generateToken.js"
import upload from "../config/multer.js"

const router = express.Router();
//to upload files we need to use upload middleware
//userPic is the fieldName imported from multer.js
router.post("/register", upload.single("userPic"), userValidator, registerUser);
router.post("/login", loginUser);

router.get("/all", authToken.isAuthorized, getAllUsers)

export default router