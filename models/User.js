import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'], 
        minLength: 3,
        maxLength: 20,
        trim: true
    },

   email: {
        type: String,
        required: [true, 'Please provide a email'], 
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },

    password: {
        type: String, 
        required: [true, 'Please provide a password'],
        minLength: 6,
        select: false
    },

    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        default: 'lastname'
    },

    location:{
        type: String,
        trim: true,
        maxLength: 20, 
        default: 'my city'
    }
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return
     const salt = await bcrypt.genSalt(10);
     this.password =  await bcrypt.hash(this.password, salt)

})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}

export default mongoose.model('User', UserSchema);