import { UnAuthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
   
    console.log(req.cookies);
    const token = req.cookies.token;

    if(!token){
        throw new UnAuthenticatedError('Not authorized!')
    }


    //Passing in to req.user .... 
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
       const testUser = payload.userID === '6399304eb6cb8ef4013948b0'
        req.user = { userID: payload.userID, testUser }

        
        next()
    } catch (error) {
         throw new UnAuthenticatedError('Not authorized to perform this action!')
    }


    
}

export default auth;