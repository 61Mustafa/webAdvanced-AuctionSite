import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {validateNumber} from "./bid-controller.js";

// Gedefinieerde JWT_SECRET
export const JWT_SECRET = 'BizeHerYerTrabzonGardasss61';

export function getAllUsers(req, res) {
    const allUsers = users.map(user => {
        const {bids, ...userData} = user;  // Verwijder password en bids
        return userData;
    });
    return res.status(StatusCodes.OK).json({users: allUsers});
}

export function getAllBidsFromUser(req, res) {
    const userId = Number(req.params.userId);  // Zorg ervoor dat userId een nummer is

    // Controleer of het een geldig nummer is
    if (!validateNumber(res, userId, StatusCodes.BAD_REQUEST, "Invalid user ID")) return;

    const user = searchUser(userId, res, statusCodes.NOT_FOUND, "User not found");
    if (!user) return;

    // Haal de biedingen van de gebruiker op
    const userBids = user.bids;

    // Retourneer de biedingen met een 200 OK status
    return res.status(StatusCodes.OK).json({bids: userBids});
}

//POSTS
export function addUser(req, res) {
    const {username, email, password} = req.body;

    // Controleer of alle verplichte velden aanwezig zijn (zonder userId)
    if (!username || !email || !password) {
        console.log("Missing required fields:", {username, email, password});
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Controleer of de gebruiker al bestaat op basis van email
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        console.log("User already exists:", existingUser);
        return res.status(StatusCodes.CONFLICT).json({message: 'User already exists'});
    }

    // Bepaal het nieuwe userId: hoogste bestaande userId + 1
    const newUserId = users.length > 0 ? Math.max(...users.map(user => user.userId)) + 1 : 1;

    // Has het wachtwoord
    try {
        console.log("Hashing password...");
        const hashedPassword = bcrypt.hashSync(password, 12);  // Hash het wachtwoord
        console.log("Password hashed successfully");

        // Voeg de nieuwe gebruiker toe aan de lijst
        const newUser = {
            userId: newUserId,  // Automatisch gegenereerd userId
            username,
            email,
            password: hashedPassword,  // Opslaan als gehashed wachtwoord
            role: 'user',
            bids: []
        };
        users.push(newUser);

        // Genereer JWT-token voor de gebruiker
        console.log("Generating JWT token...");
        const token = jwt.sign({id: newUser.userId, email: newUser.email}, JWT_SECRET, {expiresIn: '1d'});
        console.log("JWT token generated:", token);

        return res.status(StatusCodes.CREATED).json({message: 'New user created', user: newUser, token});
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error creating user'});
    }
}

// POST request voor gebruiker login
export function loginUser(req, res) {
    const {username, password} = req.body;

    // Controleer of gebruikersnaam en wachtwoord zijn meegegeven
    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing username or password'});
    }

    // Zoek naar de gebruiker
    const user = users.find(user => user.username === username);

    // Controleer of de gebruiker bestaat
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'User not found'});
    }

    // Vergelijk het ingevoerde wachtwoord met het gehashte wachtwoord
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Incorrect password'});
    }

    // Genereer JWT-token voor de ingelogde gebruiker met de constante JWT_SECRET
    const token = jwt.sign({id: user.userId, email: user.email}, JWT_SECRET, {expiresIn: '1d'});

    return res.status(StatusCodes.OK).json({message: 'Login successful', user, token});
}


export function searchUser(userID, res, statusCode, errorMessage) {
    const user = users.find(user => user.userId === userID);
    if (!user) {
        res.status(statusCode).json({message: errorMessage});
        return null;
    }
    return user;
}
