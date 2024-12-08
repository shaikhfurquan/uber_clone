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

        const hashPassword= await UserModel.hashPassword(password)

        const user = await registerUserService({
            firstName : fullName.firstName,
            lastName : fullName.lastName,
            email : email,
            password : hashPassword
        })
        const token = await user.generateAuthToken()
        res.status(201).json({
            message: 'User registred successfully',
            token: token,
            user: user
        })
    } catch (error) {
        res.status(500).json({ message: "Error while registering user controller", error: error.message});
    }
}

