require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const JWT_SECURITY_KEY=process.env.JWT_SECURITY_KEY;
// register
const registerUser= async(req,res)=>{
    try{
        // get username, email and password from frontend
        const {username,email,password} = req.body;

        // Check if username and email are present in our database or not
        const getUser = await User.findOne({$or: [{ username }, { email }],});
        if(getUser){
            return res.status(400).json({
                success:false,
                message:"User is already exists either with same username or same email. Please try with different one"
            })
        }

        // create hashPassword
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // adding it to database
        const newUser = await User.create({
            username,email,
            password:hashPassword,
        })

        if(newUser){
            res.status(200).json({
                success:true,
                message:"User created successfully!",
                data:newUser,
    
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Unable to register the user! Please try again.",
    
            })
        }
    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}


// login

const loginUser = async(req,res)=>{
    try{
        // get username and password
        const {username,password} = req.body;

        // check username exists or not

        const getUser = await User.findOne({username});
        if(!getUser){
            return res.status(400).json({
                success:false,
                message:"Invalid Username",
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,getUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid Password",
            })
        }


        // create token
        const accessToken = jwt.sign(
            {
            username:username
            },JWT_SECURITY_KEY,{
            expiresIn:"30m",
        });

        console.log("Access token :",accessToken)

        res.status(200).json({
            success:true,
            message:"Login Successful",
            accessToken,
        })

    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}


module.exports = {registerUser,loginUser};