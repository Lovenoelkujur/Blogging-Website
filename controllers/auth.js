const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// JWT KEY
const jwtSecretKey = process.env.SECRET_KEY;

const userModel = require("../models/auth");

const signUp = async(req, res) => {

    // console.log(req.body);

    // Salt added
    const salt = bcrypt.genSaltSync(10);
    // console.log("Salt:- ", salt);

    // Hash added
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    // console.log("Hash:- ", passwordHash);

    // saving the data of new user in DB
    const newUser = new userModel({...req.body, role : "USER", password : passwordHash});
    const newlyInsertedUser = await newUser.save();
    // console.log(newlyInsertedUser._id);

    res.status(201).json({
        success : true,
        message : "Registration Successfully, Please Login."
    })
}

const login =  async(req,res) => {

    const user = await userModel.findOne({email : req.body.email});
    // Check user in DB
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User Not Found !, Please Register first."
        })
    }

    // Check Hash password
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    // console.log(isPasswordValid);

    // Token Expiry
    const tokenExpiry = Math.ceil(new Date().getTime() / 1_000) + 3600;  // Token Valid for 1hr

    const payLoad = {
        userId : user._id,
        name : user.name,
        exp : tokenExpiry,
    };

    const token = jwt.sign(payLoad, jwtSecretKey);

    // Check password is correct
    if(isPasswordValid){

        // Generate JWT Token


        res.status(200).json({
            success : true,
            message : "Login Successfully.",
            token,
        });
    }
    else{
        res.status(401).json({
            success : false,
            message : "Invalid Username or Password."
        });
    }
    
}

const authController = {
    signUp,
    login,
}

module.exports = authController;