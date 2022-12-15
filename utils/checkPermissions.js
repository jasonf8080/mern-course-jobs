import {UnAuthenticatedError} from "../errors/index.js";



export const checkPermissions = (requestUser, resourceUserID) => {
    console.log(requestUser, resourceUserID)

    if(requestUser.userID === resourceUserID.toString()) return;

    throw new UnAuthenticatedError('Unauthorized to perform action!')
    
}

