import {games} from '../data/data.js';
import statusCodes, {StatusCodes} from 'http-status-codes';

// GET - get alle biedingen van een specifieke game
export function getBidsForGame(req, res) {
    const gameId = Number(req.params.id);

    // Gebruik de validateNumber helper om te controleren of gameId geldig is
    if (!validateNumber(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Zoek naar de game met de helper-functie searchGame
    const game = searchGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} does not exist!`);
    if (!game) return;  // Stop als de game niet gevonden wordt

    // Als de game bestaat, retourneer de lijst.
    // Het maakt niet uit of de lijst leeg is of niet.
    if (game.bids && game.bids.length > 0) {
        return res.status(StatusCodes.OK).json(game.bids);  // 200
    } else {
        // Als er geen biedingen zijn, retourneer een melding
        return res.status(StatusCodes.OK).json({message: 'No bids found for this game'});  // 200
    }
}

// request om een bod toe te voegen aan een specifieke game
export function addBid(req, res) {
    const gameId = Number(req.params.id);
    const {bidId, bidAmount, bidTime, userId} = req.body;

    if (!validateNumber(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;
    // Zoek naar de game
    const game = searchGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;  // Stop als de game niet gevonden wordt

    // Controleer of alle verplichte velden aanwezig zijn
    if (!bidId || !bidAmount || !bidTime || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Voeg het bod toe aan de game
    const newBid = {bidId, bidAmount, bidTime, userId, gameId};
    game.bids.push(newBid);

    return res.status(StatusCodes.CREATED).json({message: 'Bid added successfully', bid: newBid});
}

//Validate Number
export function validateNumber(res, value, statusCode, errorMessage) {
    if (isNaN(value)) {
        res.status(statusCode).json({message: errorMessage});
        return false;
    }
    return true;
}

//SearchToGame
export function searchGame(gameID, res, statusCode, errorMessage) {
    const game = games.find(game => game.gameId === gameID);
    if (!game) {
        res.status(statusCode).json({message: errorMessage});
        return null;
    }
    return game;
}
