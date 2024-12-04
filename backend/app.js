import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import connectToDB from './db/connectDB.js';
const app = express();

app.use(cors());

connectToDB()
app.get('/', (req, res) => {
    res.send('Hello World')
})


export { app }