import jwt from 'jsonwebtoken';
import statusCodes from 'http-status-codes';
import {JWT_SECRET} from "../controllers/user-controller.js";

export function verifyToken(req, res, next) {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(statusCodes.UNAUTHORIZED).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(statusCodes.UNAUTHORIZED).json({message: 'Invalid token'});
    }
}