import UserModel from '../models/user.model.js'
import { validationResult } from 'express-validator'
import blacklistTokenModel from '../models/blackListToken.model.js';
import CaptainModel from '../models/captain.model.js';
import { registerCaptainService } from '../services/captain.service.js';




export const registerCaptainController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicle } = req.body

        // check if the captain already exists
        const isCaptainExists = await CaptainModel.findOne({ email })
        if (isCaptainExists) {
            return res.status(400).json({ message: "Captain already exists with the same email" })
        }
        const hashPassword = await CaptainModel.hashPassword(password)

        const captain = await registerCaptainService({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })

        const token = captain.generateAuthToken()
        res.status(201).json({ message: "captain registered successfully", token, captain })

    } catch (error) {
        res.status(500).json({
            message: "Error while registering captain controller", error: error.message
        })
    }
}


export const loginCaptainController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        // check if the captain already exists
        const captain = await CaptainModel.findOne({ email }).select('+password')
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        console.log("captain");

        const isMatch = await captain.comparePassword(password)
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        const token = captain.generateAuthToken()
        res.cookie("token", token)
        res.status(201).json({ message: `Welcome ${captain.fullName.firstName}`, token, captain })

    } catch (error) {
        res.status(500).json({
            message: "Error while login captain controller", error: error.message
        })
    }
}


export const getCaptainProfileController = async (req, res, next) => {
    try {
        res.status(200).json({
            message: `Welcome ${req.captain.fullName.firstName} captains profile`,
            captain: req.captain
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while getting captain profile controller", error: error.message
        })
    }
}


export const logoutCaptainController = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        await blacklistTokenModel.create({ token })
        res.clearCookie('token')
        res.status(201).json({message : "captain logged out successfully"})

    } catch (error) {
        res.status(500).json({
            message: "Error while logout captain profile controller", error: error.message
        })
    }
}

