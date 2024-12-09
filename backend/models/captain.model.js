import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: [3, 'First Name required 3 characters']
        },
        lastName: {
            type: String,
            trim: true,
            min: [3, 'Last Name required 3 characters']
        }
    },
    email: {
        type: String,
        required: [true, 'Email address required'],
        trim: true,
        unique: [true, 'Email address unique']

    },
    password: {
        type: String,
        required: [true , 'Password required'],
        select: false,
    },
    socketId: {
        type: String,
    },
    status:{
        type: String,
        enum : ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle :{
        color : {
            type : String,
            required: true,
            min : [3 , 'Color must be at least 3 characters long'],
        },
        plate : {
            type : String,
            required: true,
            min : [3 , 'Plate must be at least 3 characters long'],
        },
        capacity : {
            type : Number,
            required: true,
            min : [1 , 'Capacity must be at least 1']
        },
        vehicleType : {
            type : String,
            required: true,
            enum : ['car' , 'motorcycle' , 'auto']
        },
        location :{
            lat : {
                type : Number
            },
            lng : {
                type : Number
            }
        }
    }
}, { timestamps: true })

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    return token
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const CaptainModel = mongoose.model('captain', captainSchema)

export default CaptainModel