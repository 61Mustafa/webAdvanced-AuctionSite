import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {validateInput} from "./bid-controller.js";

// Mijn unieke JWT-SECRET die niemand kan weten :)
export const JWT_SECRET = 'BizeHerYerTrabzonGardasss61';

// GET - Vraag alle biedingen van een specifieke gebruiker op
export function getAllBidsFromUser(req, res) {
    const userId = Number(req.params.userId);

    if (!validateInput(res, userId, StatusCodes.BAD_REQUEST, "Invalid user ID")) return;

    const user = searchAndReturnUser(userId, res, statusCodes.NOT_FOUND, "User not found");
    if (!user) return;

    const userBids = user.bids;

    return res.status(StatusCodes.OK).json({bids: userBids});
}
//POSTS

// POST - Nieuwe gebruiker
export function addUser(req, res) {
    const {username, email, password} = req.body;

    // Check of alle velden zijn ingevuld
    if (!username || !email || !password) {
        console.log("Missing required fields:", {username, email, password});
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Check of de gebruiker al bestaat
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        console.log("User already exists:", existingUser);
        return res.status(StatusCodes.CONFLICT).json({message: 'User already exists'});
    }

    // De nieuwe userId is 1tje hoger dan de hoogste userId
    const newUserId = users.length > 0 ? Math.max(...users.map(user => user.userId)) + 1 : 1;

    // Hash het wachtwoord van de gebruiker
    try {
        console.log("Hashing password...");
        const hashedPassword = bcrypt.hashSync(password, 12);
        console.log("Password hashed successfully");

        // Voeg de nieuwe gebruiker toe aan de lijst
        const newUser = {
            userId: newUserId,
            username,
            email,
            password: hashedPassword,
            role: 'user',
            bids: []
        };
        users.push(newUser);

        // Genereer een JWT-token voor de nieuwe gebruiker
        const token = jwt.sign({id: newUser.userId, email: newUser.email}, JWT_SECRET, {expiresIn: '1d'});

        return res.status(StatusCodes.CREATED).json({message: 'New user created', user: newUser, token});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error creating user'});
    }
}

// POST - Gebruiker inloggen
export function loginUser(req, res) {
    const {email, password} = req.body;

    // Check of alle velden zijn ingevuld
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing username or password'});
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'The password doesnt match or the user does not exist!'});
    }

    // Vergelijk het ingevoerde wachtwoord met het gehashte wachtwoord van de gebruiker
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Incorrect password'});
    }

    // Genereer een JWT-token voor de gebruiker
    const token = jwt.sign({id: user.userId, email: user.email, role: user.role}, JWT_SECRET, {expiresIn: '1d'});

    return res.status(StatusCodes.OK).json({message: 'Login successful', user, token});
}
