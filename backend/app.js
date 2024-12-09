import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectToDB from './db/connectDB.js';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import captainRouter from './routes/captain.route.js';
const app = express();

// express middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/captain' , captainRouter)


connectToDB()
app.get('/', (req, res) => {
    res.send('Hello World')
})


export { app }