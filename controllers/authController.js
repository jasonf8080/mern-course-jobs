import User from "../models/User.js";
import 'http-status-codes';
import { StatusCodes } from "http-status-codes";

import {BadRequestError, NotFoundError, UnAuthenticatedError} from "../errors/index.js";
import { attachCookies } from "../utils/attachCookies.js";

const register = async(req, res) => {

    const {name, email, password} = req.body;

    if(!name ||!email || !password){
        throw new CustomAPIError('Please provide all values');
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        throw new BadRequestError('Account already exists, please check credentials')
    }

    const user = await User.create({name, email, password});
    const token = user.createJWT();
    
     attachCookies({res, token})

    res.status(StatusCodes.OK).json({user:{
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name
    }})

}


const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new UnAuthenticatedError('User does not exist!')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Password does not match this account!')
    }
    
    const token = user.createJWT();
    user.password = undefined;

    attachCookies({res, token})

    
    res.status(StatusCodes.OK).json({user, location: user.location})
}

const updateUser = async(req, res) => {
   
    const {name, email, lastName, location} = req.body;
    

    if(!email || !name || !lastName || !location){
        throw new BadRequestError('Please Provide all values')
    }

    const user = await User.findOne({_id: req.user.userID});
    
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    const token = user.createJWT();
    console.log(req.body)

    res.status(StatusCodes.OK).json({user, location: user.location})

}


const getCurrentUser = async (req,res) => {
    const user = await User.findOne({_id: req.user.userID});
    res.status(StatusCodes.OK).json({user, location: user.location})
}


const logout = async(req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({msg: 'Logging Out!'})
}

export {register, login, updateUser, getCurrentUser, logout}

//setup app.js
//connectDB
//routes and controllers
//error handling
//Register
    //check if empty fields,
    //check if user exists,
    //create User in db,
    //create jwt
//hash password Schema.pre('save')
//create JWT
    //jwt.sign({userID: id, name: 'jason} 'secret', {expiresIn: 1d})
//choose what is past in user object 
//Login
    //check empty fields,
    //check if user exists in db,
    //check is password is correct
    //compare passwords 


//authenticateUser middleware
    //req.headers.authorization --Bearer token
    //Check ^
    //Setup req.user



