import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from "http-status-codes";
import {searchAndReturnGame, validateInput} from "./bid-controller.js";

// ALL GETS

// GET - alle games, zoek en filter
export function getAllGames(req, res) {
    const {title, category, publisher, startPrice, limit} = req.query;

    // Filter en zoek op basis van query parameters
    let filteredGames = games.filter(game =>
        (!title || game.title.toLowerCase().includes(title.toLowerCase())) &&
        (!category || game.category.toLowerCase().includes(category.toLowerCase())) &&
        (!publisher || game.publisher.toLowerCase().includes(publisher.toLowerCase())) &&
        (!startPrice || game.startingPrice <= parseFloat(startPrice))
    );

    // Limiteer aantal gezochte games
    if (limit) {
        const maxAmount = parseInt(limit, 10);
        filteredGames = filteredGames.slice(0, maxAmount);
    }

    if (filteredGames.length > 0) {
        return res.status(statusCodes.OK).json(filteredGames);
    } else {
        return res.status(statusCodes.NOT_FOUND).json({message: 'Geen game(s) gevonden'});
    }
}



// GET - Specifieke game
export function getSpecificGame(req, res) {
    const gameId = Number(req.params.id);

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;

    return res.status(StatusCodes.OK).json(game);
}

// ALL POSTS

// POST - Nieuwe game
export function addGame(req, res) {
    const {gameId, title, description, publisher, category, startingPrice, auctionEndDate} = req.body;

    // Kijk of alle velden zijn ingevuld
    if (!title || !description || !publisher || !category || !startingPrice || !auctionEndDate) {
        return res.status(statusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    const existingGame = games.find(game => game.gameId === gameId);
    if (existingGame) {
        return res.status(statusCodes.CONFLICT).json({message: 'Game already exists'});
    }

    // Nieuwe userID is 1tje hoger dan de laatste userID
    const newGameId = games.length > 0 ? Math.max(
        ...games.map(game => game.gameId)) + 1 : 1;

    // Voeg nieuwe game data toe aaa de lijst
    const newGame = {
        gameId : newGameId,
        title,
        description,
        publisher,
        category,
        startingPrice,
        auctionEndDate,
    };
    games.push(newGame);

    return res.status(statusCodes.CREATED).json({message: 'New game created', game: newGame});
}

// ALL PUTS

// PUT - Bewerk game
export function updateGame(req, res) {
    const gameId = Number(req.params.id);

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;

    // Vraag de nieuwe waardes uit de body op
    const {title, description, publisher, category, startingPrice, auctionEndDate} = req.body;

    if (!title || !description || !publisher || !category || !startingPrice || !auctionEndDate) {
        return res.status(statusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Bewerk game met de nieuwe waardes
    game.title = title;
    game.description = description;
    game.publisher = publisher;
    game.category = category;
    game.startingPrice = startingPrice;
    game.auctionEndDate = auctionEndDate;

    return res.status(statusCodes.OK).json({message: `Game with ID ${gameId} successfully updated`, game});
}

// ALL DELETES

// DELETE - Verwijder game
export function deleteGame(req, res) {
    const gameId = Number(req.params.id);

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Vindt de game in de lijst
    const gameIndex = games.findIndex(game => game.gameId === gameId);

    // Geef 404 terug als de game niet gevonden is
    if (gameIndex === -1) {
        return res.status(StatusCodes.NOT_FOUND).json({message: `Game with ID ${gameId} not found`});
    }

    // Verwijder de game
    games.splice(gameIndex, 1);

    return res.status(StatusCodes.OK).json({message: `Game with ID ${gameId} successfully deleted`});
}

