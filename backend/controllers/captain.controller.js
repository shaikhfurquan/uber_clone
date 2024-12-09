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

            const {fullName , email, password , vehicle} = req.body

            // check if the captain already exists
            const isCaptainExists = await CaptainModel.findOne({email})
            if (isCaptainExists) {
                return res.status(400).json({message : "Captain already exists with the same email"})
            }
            const hashPassword = await CaptainModel.hashPassword(password)

            const captain = await registerCaptainService({
                firstName : fullName.firstName,
                lastName : fullName.lastName,
                email,
                password: hashPassword,
                color : vehicle.color,
                plate : vehicle.plate,
                capacity : vehicle.capacity,
                vehicleType : vehicle.vehicleType
            })

            const token = captain.generateAuthToken()
            res.status(201).json({message : "captain registered successfully" , token , captain})

    } catch (error) {
        res.status(500).json({ message : "Error registering captain controller",  error: error.message
        })
    }
}