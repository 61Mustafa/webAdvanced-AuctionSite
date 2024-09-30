import {games} from '../data/data.js';
import statusCodes, {StatusCodes} from 'http-status-codes';

// GET - all bids from a specific game
export function getBidsForGame(req, res) {
    const gameId = Number(req.params.id);

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Search the game and return if it exists.
    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} does not exist!`);
    // If game doesn't exist, stop and return nothing.
    if (!game) return;

    // Check if there are games founded and if founded, return it.
    if (game.bids && game.bids.length > 0) {
        return res.status(StatusCodes.OK).json(game.bids);
    } else {
        return res.status(StatusCodes.OK).json({message: 'No bids found for this game'});
    }
}

// POST - new bid for a specific game
export function addBid(req, res) {
    const gameId = Number(req.params.id);
    const {bidId, bidAmount, bidTime, userId} = req.body;

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;
    // Search the game and return if it exists.
    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    // If game doesn't exist, stop and return nothing.
    if (!game) return;

    // Check if all fields are filled.
    if (!bidId || !bidAmount || !bidTime || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Add bid to the game
    const newBid = {bidId, bidAmount, bidTime, userId, gameId};
    game.bids.push(newBid);

    return res.status(StatusCodes.CREATED).json({message: 'Bid added successfully', bid: newBid});
}

//Validate input of the user
export function validateInput(res, value, statusCode, errorMessage) {
    if (isNaN(value)) {
        res.status(statusCode).json({message: errorMessage});
        return false;
    }
    return true;
}

//SearchToGame
export function searchAndReturnGame(gameID, res, statusCode, errorMessage) {
    const game = games.find(game => game.gameId === gameID);
    if (!game) {
        res.status(statusCode).json({message: errorMessage});
        return null;
    }
    return game;
}