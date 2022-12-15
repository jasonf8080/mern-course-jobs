import {StatusCodes} from 'http-status-codes';
import CustomAPIError from './custom-api.js';

class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;