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
    try {
        if(!email || !password){
            throw Error('Email and password are required')
        }
        if(!validator.isEmail(email)){
            throw Error('Invalid email')
        }
        if(!validator.isStrongPassword(password)){
            throw Error('Password should contain number, character and special character');
        }
        
        const exists = await this.findOne({email});
        if(exists){
            throw Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await this.create({email, password: hash})

        return user
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

UserSchema.statics.login = async function(email, password) {
    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })
    
    if (!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}

const User = mongoose.model('User', UserSchema)
module.exports = User