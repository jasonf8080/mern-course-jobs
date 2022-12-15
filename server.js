
import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan'
import connectDB from './db/connect.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//Security
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize';

import cookieParser from 'cookie-parser';




//Routers
import authRouter from './routes/authRouter.js'
import jobRouter from './routes/jobRouter.js'



//Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from "./middleware/auth.js"


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})  


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

app.listen(port, async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log(`Server Listening on Port: ${port}`)
    } catch (error) {
        
    }

})