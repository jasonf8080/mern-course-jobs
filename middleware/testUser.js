import { BadRequestError } from "../errors";

export const testUser = (req, res, next) => {
    if(req.user.testUser){
        throw new BadRequestError('Test User.. Read Only')
    }

    next();
}