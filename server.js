import express from "express";
import userRouter from "./routers/userRouter.js";
import { conToDB } from './utils/database.js';
import cors from "cors";

const app = express();


//DB connection
conToDB();


//express and cors middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
//routers
app.use("/api/user", userRouter);

//error handling
app.use((req, res, next)=>{
    const err = new Error("NOT FOUND");
    err.status = 404;

    next(err)
});

//error handler middleware
app.use((req, res, next)=>{
    if  (err){
        res.status(err.status || 500).send(err)
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server is up and running on PORT", PORT))