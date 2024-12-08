import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
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
        required: [true, 'Password required'],
        select: false
    },
    socketId: {
        type: String,
    }
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    return token
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model('user', userSchema)

export default UserModel