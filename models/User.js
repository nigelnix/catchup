import mongoose from "mongoose";
import { hashedPasswordFunc } from "../lib/auth.js";

const UserSchema = mongoose.Schema({
username: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
},
userPic: String,
});

UserSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();
    this.password = await hashedPasswordFunc(this.password);
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;