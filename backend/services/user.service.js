import UserModel from '../models/user.model.js'

export const registerUserService = async ({ firstName, lastName, email, password }) => {
    try {
        if (!firstName || !email || !password) {
            throw new Error('All fields must be provided');
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