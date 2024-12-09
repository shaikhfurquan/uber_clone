import express from 'express';
import { body } from 'express-validator'
import { isAuthCaptain, isAuthUser } from '../middlewares/isAuth.middleware.js';
import { getCaptainProfileController, loginCaptainController, logoutCaptainController, registerCaptainController } from '../controllers/captain.controller.js';

const captainRouter = express.Router();


captainRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],
    registerCaptainController
)

captainRouter.post('/login', [
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
], loginCaptainController)


captainRouter.get('/profile', isAuthCaptain, getCaptainProfileController)
captainRouter.get('/logout', isAuthCaptain, logoutCaptainController)

export default captainRouter