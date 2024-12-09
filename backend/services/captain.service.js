import UserModel from '../models/user.model.js'
import CaptainModel from '../models/captain.model.js';

export const registerCaptainService = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {
    try {
        if (!firstName || !email || !password || !plate || !capacity || !vehicleType || !color) {
            throw new Error("All fields must be required");
        }

        const captain = await CaptainModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        })
        return captain
    } catch (error) {
        throw new Error(error.message || 'An error occurred while registering the captain service');
    }
};