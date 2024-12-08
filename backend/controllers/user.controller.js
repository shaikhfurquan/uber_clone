import { registerUserService } from '../services/user.service.js'
import UserModel from '../models/user.model.js'
import { validationResult } from 'express-validator'


export const registerUserController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        const hashPassword = await UserModel.hashPassword(password)

        const user = await registerUserService({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email: email,
            password: hashPassword
        })
        const token = await user.generateAuthToken()
        res.status(201).json({
            message: 'User registred successfully',
            token: token,
            user: user
        })
    } catch (error) {
        res.status(500).json({ message: "Error while registering user controller", error: error.message });
    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        // check if the user is registered or not
        const user = await UserModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // if user is there then checking the password 
        const isMatch = await user.comparePassword(password)
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = await user.generateAuthToken()

        res.status(200).json({
            message: `Welcome ${user.fullName.firstName}`,
            token: token,
            user: user
        })
    } catch (error) {
        res.status(500).json({ message: "Error while login user controller", error: error.message });
    }
}

