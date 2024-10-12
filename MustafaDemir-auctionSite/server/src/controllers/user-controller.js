import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {validateInput} from "./bid-controller.js";

// My Unique and never foundable password.
export const JWT_SECRET = 'BizeHerYerTrabzonGardasss61';

// GET - all information of users
export function getAllUsers(req, res) {

    // get all users.
    const allUsers = users.map(user => {
        const {...userData} = user;
        return userData;
    });
    return res.status(StatusCodes.OK).json({users: allUsers});
}

// GET - all bids from a specific user.
export function getAllBidsFromUser(req, res) {
    const userId = Number(req.params.userId);

    // Check if userID is a number.
    if (!validateInput(res, userId, StatusCodes.BAD_REQUEST, "Invalid user ID")) return;

    // Search the user and return if it exists.
    const user = searchAndReturnUser(userId, res, statusCodes.NOT_FOUND, "User not found");
    // If user doesn't exist, stop and return nothing.
    if (!user) return;

    const userBids = user.bids;

    return res.status(StatusCodes.OK).json({bids: userBids});
}

//POSTS

// POST - new user
export function addUser(req, res) {
    const {username, email, password} = req.body;

    // Check if all fields are filled.
    if (!username || !email || !password) {
        console.log("Missing required fields:", {username, email, password});
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Check if user already exist.
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        console.log("User already exists:", existingUser);
        return res.status(StatusCodes.CONFLICT).json({message: 'User already exists'});
    }

    // Determine the new userId: highest existing userId + 1
    const newUserId = users.length > 0 ? Math.max(...users.map(user => user.userId)) + 1 : 1;

    // Hash the password
    try {
        console.log("Hashing password...");
        const hashedPassword = bcrypt.hashSync(password, 12);
        console.log("Password hashed successfully");

        // Add user to the user list.
        const newUser = {
            userId: newUserId,
            username,
            email,
            password: hashedPassword,
            role: 'user',
            bids: []
        };
        users.push(newUser);

        // Generate JWT-Token for the user.
        console.log("Generating JWT token...");
        const token = jwt.sign({id: newUser.userId, email: newUser.email}, JWT_SECRET, {expiresIn: '1d'});
        console.log("JWT token generated:", token);

        return res.status(StatusCodes.CREATED).json({message: 'New user created', user: newUser, token});
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error creating user'});
    }
}

// POST - login user
// POST - login user
export function loginUser(req, res) {
    const {email, password} = req.body;

    // Check if all fields are filled.
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing username or password'});
    }

    // Check if the user exists.
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'The password doesnt match or the user does not exist!'});
    }

    // Compare the inputted password and the hashed password.
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Incorrect password'});
    }

    // Generate a JWT-token for the user that logs in with the JWT-SECRET.
    const token = jwt.sign({id: user.userId, email: user.email, role: user.role}, JWT_SECRET, {expiresIn: '1d'});

    // Redirect based on the user's role
    if (user.role === 'admin') {
        return res.status(StatusCodes.OK).json({
            message: 'Login successful',
            token,
        });
    } else {
        return res.status(StatusCodes.OK).json(
            {message: 'Login successful', token});
    }
}
