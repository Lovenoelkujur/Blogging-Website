const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const userModel = require("../models/auth");

dotenv.config();

// JWT KEY
const jwtSecretKey = process.env.SECRET_KEY;

const validateUser = async (req, res, next) => {
    
    // Headers
    const headers = req.headers;
    const tokenFromHeaders = headers.authorization.split(" ")[1];
    // console.log(headers);
    // 1. If no Header is Present
    if(!tokenFromHeaders){
        return res.status(401).json({
            success : "false",
            message : "Unauthenticated User",
        });
    }

    // 2. Match Header and secret key (jwt)
    try {
        jwt.verify(tokenFromHeaders, jwtSecretKey)
    } 
    catch (error) {
        return res.status(401).json({
            success : "false",
            message : "Unauthenticated User",
        });
    }

    // 3. Validity expiry Date (payload part)
    const tokenData = jwt.decode(tokenFromHeaders);
    // console.log(tokenData);
    const tokenExp = tokenData.exp;
    const now = Math.ceil(new Date().getTime / 1_000);
    if(tokenExp < now){
        return res.status(401).json({
            success : "false",
            message : "Unauthenticated User",
        });
    }

    // 4. Validate user ID
    const userId = tokenData.userId;
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(401).json({
            success : "false",
            message : "Unauthenticated User",
        });
    }
    // Passing the data (sending User ID)
    req.user = user;
    
    next();
}

module.exports = validateUser;