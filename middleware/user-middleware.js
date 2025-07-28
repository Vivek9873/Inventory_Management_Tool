
const jwt = require("jsonwebtoken");
const JWT_SECURITY_KEY= process.env.JWT_SECURITY_KEY;
const authMiddleware = (req,res,next)=>{
    
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Access denied! No token provided. Please login to continue",
        })
    }
    try{
        const decodedToken = jwt.verify(token,JWT_SECURITY_KEY);
        req.userInfo = decodedToken;
        next();
    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message: "Access denied. No token provided. Please login to continue",
        })
    }
}

module.exports = authMiddleware;