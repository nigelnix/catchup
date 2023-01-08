import bcrypt from "bcrypt";

export const hashedPasswordFunc = async (text)=>{
    const hashedPassword = bcrypt.hash(text, 10);
    return hashedPassword;
};

export const comparePass = async (plainText, databasePassword)=>{
    const isMatch = await bcrypt.compare(plainText, databasePassword);
    return isMatch;
};