import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import connectToDB from './db/connectDB.js';
import morgan from 'morgan';
const app = express();

app.use(cors());
app.use(morgan('dev'))

connectToDB()
app.get('/', (req, res) => {
    res.send('Hello World')
})


export { app }