const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const schema= mongoose.Schema

const UserSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
UserSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password){
        throw Error('Email and password are required')
    }
    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password should contain number charcter and special character');
    }
    const exists = await this.findOne({email: email});

    if(exists){
        throw Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email: email, password: hash})
    return user
}


const User = mongoose.model('User', UserSchema)
module.exports = User