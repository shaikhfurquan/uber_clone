import mongoose from 'mongoose';

const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL + process.env.DB_NAME)
        console.log('Connected to DB ==> ' + process.env.DB_NAME)
    } catch (error) {
        console.log('Error connecting to database' , error.message);
    }
}

export default connectToDB
