import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import {searchAndReturnGame, validateInput} from "./bid-controller.js";

// ALL GETS

// GET - all games, filter and search
export function getAllGames(req, res) {
    const {title, category, publisher, startPrice, limit} = req.query;

    // Filter and search based on query parameters .
    let filteredGames = games.filter(game =>
        (!title || game.title.toLowerCase().includes(title.toLowerCase())) &&
        (!category || game.category.toLowerCase().includes(category.toLowerCase())) &&
        (!publisher || game.publisher.toLowerCase().includes(publisher.toLowerCase())) &&
        (!startPrice || game.startingPrice <= parseFloat(startPrice))
    );

    // If the user add a limit to see max amount of games, limit amount.
    if (limit) {
        const maxAmount = parseInt(limit);
        filteredGames = filteredGames.slice(0, maxAmount);
    }
    // Check if there are games founded and if founded, return it.
    if (filteredGames.length > 0) {
        return res.status(statusCodes.OK).json(filteredGames);
    } else {
        return res.status(statusCodes.NOT_FOUND).json({message: 'Geen game(s) gevonden'});
    }
}

// GET - specific game
export function getSpecificGame(req, res) {
    const gameId = Number(req.params.id);

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Search the game and return if it exists.
    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    // If game doesn't exist, stop and return nothing.
    if (!game) return;

    return res.status(StatusCodes.OK).json(game);
}

// ALL POSTS

// POST - game
export function addGame(req, res) {
    const {gameId, title, description, publisher, category, startingPrice, auctionEndDate, bids} = req.body;

    // Check if all fields are filled.
    if (!title || !description || !publisher || !category || !startingPrice || !auctionEndDate) {
        return res.status(statusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Check if game already exists.
    const existingGame = games.find(game => game.gameId === gameId);
    if (existingGame) {
        return res.status(statusCodes.CONFLICT).json({message: 'Game already exists'});
    }

    // Find the highest gameID and set the value of newGameID to + 1;
    const newGameId = games.length > 0 ? Math.max(
        ...games.map(game => game.gameId)) + 1 : 1;

    // Add game to the games list.
    const newGame = {
        gameId : newGameId,
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
    const gameId = Number(req.params.id);

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Search the game and return if it exists.
    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    // If game doesn't exist, stop and return nothing.
    if (!game) return;

    // get the new values from the body.
    const {title, description, publisher, category, startingPrice, auctionEndDate} = req.body;

    // Check if fields are missing.
    if (!title || !description || !publisher || !category || !startingPrice || !auctionEndDate) {
        return res.status(statusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Update the game attributes of the game.
    game.title = title;
    game.description = description;
    game.publisher = publisher;
    game.category = category;
    game.startingPrice = startingPrice;
    game.auctionEndDate = auctionEndDate;

    return res.status(statusCodes.OK).json({message: `Game with ID ${gameId} successfully updated`, game});
}

// ALL DELETES

// DELETE specific game
export function deleteGame(req, res) {
    const gameId = Number(req.params.id);

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Find the index of the game in the list.
    const gameIndex = games.findIndex(game => game.gameId === gameId);

    // If the game doesn't exist, return not found!
    if (gameIndex === -1) {
        return res.status(StatusCodes.NOT_FOUND).json({message: `Game with ID ${gameId} not found`});
    }

    // Delete the game in the list.
    games.splice(gameIndex, 1);

    return res.status(StatusCodes.OK).json({message: `Game with ID ${gameId} successfully deleted`});
}

