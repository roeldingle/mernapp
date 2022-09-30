const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const User = require('../models/userModels')

//@desc Get info of logged in user
//@route GET/api/auth/me
//@access Private
const getMe = asyncHandler(async(req,res) => {
    res.status(200).json({message: 'me here', data: req.user})
})

//@desc Login a user
//@route POST/api/auth/login
//@access Public
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    //Check if user exist
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){

        if(!user.active){
            res.status(400).json({message: 'Your account is not yet activated'})
        }

        return res.status(200).json({
            _id: user._id,
            firstname: user.firstname, 
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else{
        res.status(400).json({message: 'Invalid credentials'})
    }

})

//@desc Register a user
//@route POST/api/auth/register
//@access Public
const registerUser = asyncHandler(async(req,res) => {

    /*destructure*/
    const {
        firstname, 
        lastname,
        email,
        password
        } = req.body;

    /*check sent data if available*/
    if(
        !firstname 
        || !lastname 
        || !email 
        || !password
        ){
        res.status(400).json({message: 'Missing field data'})
    }

    //Check duplicate
    const hasDuplicate = await User.findOne({email})

    if(hasDuplicate){
        return res.status(400).json({message: 'Email already exist'})
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) //salt rounds

    const userObject = {firstname, lastname, email, password: hashedPassword, active: false}//set user active to false

    //Craete and store new user
    const user = await User.create(userObject)

    if(user){
        return res.status(201).json({
            _id: user._id,
            firstname: user.firstname, 
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            //token: generateToken(user._id)
        })
    }else{
        res.status(400).json({message: 'Invalid user data received'})
    }
    
})

//Generate token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getMe,
}