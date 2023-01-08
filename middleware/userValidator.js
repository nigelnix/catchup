import {body} from "express-validator";

export const userValidator = [
//trim removes empty space at start or end
    body("username").notEmpty().withMessage("you should provide a username").isLength({min:3}).withMessage("username should be at least 3 characters").trim(),
    body("email").notEmpty().withMessage("you should provide an email").isEmail().withMessage("please check email address").normalizeEmail(),
    body("password").notEmpty().withMessage("you must provide a password").isLength({min:4}).withMessage("password must be at least 4 characters long")
]