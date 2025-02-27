const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require('dotenv').config()
//login user

const createToken = (_id) =>{
    return jwt.sign({_id:_id}, process.env.SECRET, { expiresIn: '3d' });
}


const loginuser = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password)
        //create a token 
        const token = createToken(user._id);
        res.status(200).json({email,token});
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupuser = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.signup(email,password)
        //create a token 
        const token = createToken(user._id);
        res.status(200).json({email,token});
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginuser,signupuser}