const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const Error = require("../middlewares/errorHandler")


//@desc Register a user
//@router Post /api/users/register
//@acess public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});


//@desc Login a user
//@router Post /api/users/login
//@acess public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email && !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password,user.password))){
        const accessTocken = jwt.sign({
            //paylead for web tocken
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
        );
        res.status(200).json({accessTocken});
    }else{
        res.status(401)
        throw new Error("Email or Password is not correct")
    }
    res.json({message:"Login the user"})
})

//@desc Current Users
//@router get /api/users/current
//@acess private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}
