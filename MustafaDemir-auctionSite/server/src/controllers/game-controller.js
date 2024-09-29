import {games} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import {searchGame, validateNumber} from "./bid-controller.js";

// ALL GETS

// GET all games
export function getAllGames(req, res) {
    const {title, category, publisher, startPrice, limit} = req.query;

    // Filter de games op basis van de query-parameters
    let filteredGames = games.filter(game =>
        (!title || game.title.toLowerCase().includes(title.toLowerCase())) &&
        (!category || game.category.toLowerCase().includes(category.toLowerCase())) &&
        (!publisher || game.publisher.toLowerCase().includes(publisher.toLowerCase())) &&
        (!startPrice || game.startingPrice <= parseFloat(startPrice))
    );

    // Beperk het aantal games als de parameter 'limit' is opgegeven
    if (limit) {
        const maxAmount = parseInt(limit);
        filteredGames = filteredGames.slice(0, maxAmount);
    }
    // Check of er games zijn gevonden
    if (filteredGames.length > 0) {
        return res.status(statusCodes.OK).json(filteredGames);
    } else {
        return res.status(statusCodes.NOT_FOUND).json({message: 'Geen game(s) gevonden'});
    }
}

// GET specific game
export function getSpecificGame(req, res) {
    const gameId = Number(req.params.id);

    // Controleer of het een geldig nummer is
    if (!validateNumber(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Gebruik searchGame om de game te zoeken
    const game = searchGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;  // Stop als de game niet gevonden wordt

    // Als het spel gevonden is, retourneer de game met een 200 status
    return res.status(StatusCodes.OK).json(game);  // Correct gebruik van StatusCodes.OK
}
    // ALL POSTS

export function addGame(req, res) {
    const {gameId, title, description, publisher, category, startingPrice, auctionEndDate, bids} = req.body;

    // Controleer of alle verplichte velden aanwezig zijn
    if (!gameId || !title || !description || !publisher || !category || !startingPrice || !auctionEndDate) {
        return res.status(statusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Controleer of de game al bestaat
    const existingGame = games.find(game => game.gameId === gameId);
    if (existingGame) {
        return res.status(statusCodes.CONFLICT).json({message: 'Game already exists'});
    }

    // Voeg de nieuwe game toe aan de lijst
    const newGame = {
        gameId,
        title,
        description,
        publisher,
        category,
        startingPrice,
        auctionEndDate,
        bids: bids || []
    };
    games.push(newGame);

    return res.status(statusCodes.CREATED).json({message: 'New game created', game: newGame});
}

    // ALL PUTS

export function updateGame(req, res) {
    const gameId = Number(req.params.id);  // Haal gameId uit de request parameters

    if (!validateNumber(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Gebruik searchGame om de game te zoeken
    const game = searchGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;  // Stop als de game niet gevonden wordt

    // Haal de nieuwe waarden uit het request body
    const {title, description, publisher, category, startingPrice, auctionEndDate} = req.body;

    // Controleer of alle vereiste velden aanwezig zijn
    if (!title || !description || !publisher || !category || !startingPrice || !auctionEndDate) {
        return res.status(statusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Update de game attributen
    game.title = title;
    game.description = description;
    game.publisher = publisher;
    game.category = category;
    game.startingPrice = startingPrice;
    game.auctionEndDate = auctionEndDate;

    // Retourneer een succesbericht
    return res.status(statusCodes.OK).json({message: `Game with ID ${gameId} successfully updated`, game});
}

    // ALL DELETES

// DELETE specific game
export function deleteGame(req, res) {
    const gameId = Number(req.params.id);  // Haal gameId uit de request parameters

    // Controleer of het een geldig nummer is
    if (!validateNumber(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Zoek naar het index van de game in de lijst van games
    const gameIndex = games.findIndex(game => game.gameId === gameId);

    // Als de game niet gevonden is, retourneer een 404 status
    if (gameIndex === -1) {
        return res.status(StatusCodes.NOT_FOUND).json({message: `Game with ID ${gameId} not found`});
    }

    // Verwijder de game uit de array
    games.splice(gameIndex, 1);

    // Retourneer een 200 status en een bericht dat de game succesvol is verwijderd
    return res.status(StatusCodes.OK).json({message: `Game with ID ${gameId} successfully deleted`});
}

