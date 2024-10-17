import jwt from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';
import {JWT_SECRET} from '../controllers/user-controller.js';
import {users} from '../data/data.js';

export function user_only(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'No token provided or invalid format'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = users.find(user => user.userId === decoded.id);

        if (!req.user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({message: 'User not found'});
        }

        // Controleer of de gebruiker geen admin is
        if (req.user.role === 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({message: 'Admins are not allowed to place bids.'});
        }

        next(); // Ga verder naar de volgende middleware of route handler
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Invalid or expired token'});
    }
}
