import express from 'express';
import { body } from 'express-validator'
import { loginUserController, registerUserController } from '../controllers/user.controller.js';
const userRouter = express.Router();


userRouter.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .notEmpty()
        .withMessage('Email is required'),
    body('fullName.firstName')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters')
        .notEmpty()
        .withMessage('First name is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .notEmpty()
        .withMessage('Password is required'),
], registerUserController)


userRouter.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .notEmpty()
        .withMessage('Password is required'),
], loginUserController)

export default userRouter