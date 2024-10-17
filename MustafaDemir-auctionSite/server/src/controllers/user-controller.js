import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Mijn unieke JWT-SECRET die niemand kan weten :)
export const JWT_SECRET = 'BizeHerYerTrabzonGardasss61';


// POST - Nieuwe gebruiker
export function addUser(req, res) {
    const {username, email, password} = req.body;

    // Check of alle velden zijn ingevuld
    if (!username || !email || !password) {
        console.log("Missing required fields:", {username, email, password});
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Valideer gebruikersinvoer
    const validationErrors = validateUserInput(username, email, password);
    if (validationErrors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: validationErrors.join(', ')});
    }

    // Controleer of de gebruiker al bestaat
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        console.log("User already exists:", existingUser);
        return res.status(StatusCodes.CONFLICT).json({message: 'User already exists'});
    }

    // Nieuwe userId genereren
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
        const token = generateToken(newUser);

        return res.status(StatusCodes.CREATED).json({message: 'New user created', user: newUser, token});
    } catch (error) {
        console.error("Error creating user:", error); // Verbeterde logging
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error creating user'});
    }
}

// POST - Gebruiker inloggen
export function loginUser(req, res) {
    const {email, password} = req.body;

    // Check of alle velden zijn ingevuld
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing email or password'});
    }

    // Valideer gebruikersinvoer
    const validationErrors = [];
    if (typeof email !== 'string' || email.trim() === '' || !isValidEmail(email)) {
        validationErrors.push('Invalid email format');
    }
    if (typeof password !== 'string' || password.trim() === '' || !isValidPassword(password)) {
        validationErrors.push('Password must be at least 8 characters long');
    }

    if (validationErrors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: validationErrors.join(', ')});
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'The password doesn’t match or the user does not exist!'});
    }

    // Vergelijk het ingevoerde wachtwoord met het gehashte wachtwoord van de gebruiker
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Incorrect password'});
    }

    // Genereer een JWT-token voor de gebruiker
    const token = generateToken(user);

    return res.status(StatusCodes.OK).json({message: 'Login successful', user, token});
}


// Helper functie voor e-mailvalidatie
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper functie voor wachtwoordsterkte
function isValidPassword(password) {
    return password.length >= 8;
}

// Helper functie voor het genereren van een JWT-token
function generateToken(user) {
    return jwt.sign({id: user.userId, email: user.email, role: user.role}, JWT_SECRET, {expiresIn: '1d'});
}

// Helper functie voor het valideren van gebruikersinvoer
function validateUserInput(username, email, password) {
    const errors = [];

    if (typeof username !== 'string' || username.trim() === '') {
        errors.push('Username must be a non-empty string');
    }
    if (typeof email !== 'string' || email.trim() === '' || !isValidEmail(email)) {
        errors.push('Invalid email format');
    }
    if (typeof password !== 'string' || password.trim() === '' || !isValidPassword(password)) {
        errors.push('Password must be at least 8 characters long');
    }

    return errors;
}
