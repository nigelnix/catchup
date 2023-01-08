import jwt from "jsonwebtoken";
import promisify from "util"
//This function is a promise, we need to use await when we call it later 

const generateToken = (user)=>{
    const payload = {id:user._id}

    return new Promise((resolve, reject)=>{
        jwt.sign(payload, process.env.SECRET, {expiresIn: "1h"}, (err, token)=>{
            if (err){
                reject(err)
                return
            }
            resolve(token)
        })
    });
};

const isAuthorized = async (req, res, next)=>{
    const token = req.cookies.access_token;
    console.log(token);

    if (!token){
        return res.status(403).json({msg: "Access Denied. Please sign up for an accountt"})
    }

    //could also use - const decoded = jwt.verify(token, process.env.SECRET)
    //put this is a way to use a promise with async/await
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET) 
    console.log(decoded);

    //return with request the id of the user(payload after decoding)

    res.user = decoded.id;
    next()
}

export default {generateToken, isAuthorized}