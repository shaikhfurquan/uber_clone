import UserModel from '../models/user.model.js'

export const registerUserService = async ({ firstName, lastName, email, password }) => {
    try {
        if (!firstName || !email || !password) {
            throw new Error('All fields must be provided');
        }

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        // Create a new user
        const user = await UserModel.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password,
        });

        return user;
    } catch (error) {
        throw new Error(error.message || 'An error occurred while registering the user service');
    }
};