const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModels')

let token

//@desc Get all users
//@route GET/api/users
//@access Private
const getUsers = asyncHandler(async(req,res) => {
    const user = await User.find()
    res.status(200).json({message: 'All user data', data: user})
})

//@desc Create user
//@route POST/api/users
//@access Private
const createUser = asyncHandler(async(req,res) => {
    /*destructure*/
    const {
        role,
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
        res.status(400);
        throw new Error('Missing field data');
    }

    //Check duplicate
    const userExist = await User.findOne({email})

    if(userExist){
        return res.status(400).json({message: 'Duplicate email'})
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) //salt rounds

    const userObject = {
        role, 
        firstname, 
        lastname, 
        email, 
        password: hashedPassword,
        createdBy: req.user.id
    }

    //Craete and store new user
    const user = await User.create(userObject)

    if(user){
        return res.status(200).json({message: `New user ${email} created`, data: {
            _id: user._id,
            firstname: user.firstname, 
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            createdBy: user.createdBy,
            token: generateToken(user._id)
        }})
    }else{
        return res.status(400).json({message: 'Invalid user data received'})
    }
})

//@desc Update user
//@route PUT/api/users/:id
//@access Private
const updateUser = asyncHandler(async(req,res) => {
    
    const userToUpdate = await User.findById(req.params.id)
    /*check if user exist*/
    if(!userToUpdate){
        res.status(400);
        throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(req.user)
    res.status(200).json({message: `Update user ${req.params.id} here`, data: updatedUser})
})

//@desc Delete user
//@route DELETE/api/users/:id
//@access Private
const deleteUser = asyncHandler(async(req,res) => {

    const userToDelete = await User.findById(req.params.id)
    /*check if user exist*/
    if(!userToDelete){
        res.status(400);
        throw new Error('User not found');
    }

    await userToDelete.remove()

    res.status(200).json({message: `Delete user ${req.params.id} here`, data: req.params.id})
})

//Generate token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}