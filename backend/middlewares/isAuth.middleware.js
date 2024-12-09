import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import blacklistTokenModel from '../models/blackListToken.model.js';
import CaptainModel from '../models/captain.model.js';


export const isAuthUser = async (req, res, next) => {
    try {
        // console.log("isAuthUser");
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // console.log("token: " + token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, There is no token' });
        }

        // checking the blacklisted token
        const isBlacklistedToken = await blacklistTokenModel.findOne({ token });
        if (isBlacklistedToken) {
            return res.status(403).json({ message: "Unauthorized , Blacklisted user token" })
        }


        // decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded._id)
        req.user = user
        return next()

    } catch (error) {
        res.status(401).json({ message: "Error while authenticating the user", error: error.message })
    }
}


export const isAuthCaptain = async (req, res, next) => {
    try {
        // console.log("isAuthUser");
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // console.log("token: " + token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, There is no token' });
        }

        // checking the blacklisted token
        const isBlacklistedToken = await blacklistTokenModel.findOne({ token });
        if (isBlacklistedToken) {
            return res.status(403).json({ message: "Unauthorized , Blacklisted captain token" })
        }


        // decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await CaptainModel.findById(decoded._id)
        req.captain = captain
        return next()

    } catch (error) {
        res.status(401).json({ message: "Error while authenticating the captain", error: error.message })
    }
}