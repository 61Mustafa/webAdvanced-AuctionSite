import {games, users} from '../data/data.js';
import statusCodes, {StatusCodes} from 'http-status-codes';

// GET - Biedingen voor specifieke game
export function getBidsForGame(req, res) {
    const gameId = Number(req.params.id);

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} does not exist!`);
    if (!game) return;

    if (game.bids && game.bids.length > 0) {
        const bidsWithUsername = addUsernamesToBids(game.bids);
        return res.status(StatusCodes.OK).json(bidsWithUsername);
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'No bids found for this game'});
    }
}

// POST - Nieuwe bod
export function addBid(req, res) {
    const gameId = Number(req.params.id);
    const {bidAmount, bidTime, userId} = req.body;

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;

    // Controleer of de veiling in het verleden is
    if (new Date(game.auctionEndDate) < new Date()) {
        return res.status(StatusCodes.PRECONDITION_FAILED).json({
            message: 'The auction has already ended. You cannot place a bid on this game.'
        });
    }

    // Nieuwe bidID is 1tje hoger dan de laatste BidID
    const newBidID = game.bids.length > 0 ? Math.max(...game.bids.map(bid => bid.bidId)) + 1 : 1;

    // Controleer op ontbrekende vereiste velden
    if (!bidAmount || !bidTime || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Typecontrole
    if (typeof bidAmount !== 'number' || bidAmount <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Bid amount must be a positive number'});
    }

    const parsedBidTime = Date.parse(bidTime);
    if (isNaN(parsedBidTime)) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid bid time'});
    }

    // Controleer of de gebruiker bestaat
    const user = users.find(user => user.userId === userId);
    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid user ID'});
    }

    // Bepaal het hoogste bod voor deze game
    const highestBid = game.bids.length > 0 ? Math.max(...game.bids.map(bid => bid.bidAmount)) : game.startingPrice;

    // Controleer of het bod hoger is dan het huidige hoogste bod
    if (bidAmount <= highestBid) {
        return res.status(StatusCodes.PRECONDITION_FAILED).json({
            message: `Your bid must be higher than the current highest bid of €${highestBid}.`
        });
    }

    // Maak nieuwe bod aan
    const newBid = {
        bidId: newBidID,
        bidAmount,
        bidTime: String(bidTime),
        userId,
        username: user.username,
        gameId
    };
    game.bids.push(newBid); // Voeg het nieuwe bod toe aan de game

    return res.status(StatusCodes.CREATED).json({message: 'Bid added successfully', bid: newBid});
}

// GET - Gewonnen veilingen
export function getWonAuctions(req, res) {
    const userId = req.user.userId;
    const currentTime = new Date();
    const wonAuctions = []; // Maak een lege array aan voor gewonnen veilingen

    games.forEach(auction => {
        const auctionEndDate = new Date(auction.auctionEndDate);

        // Check of de veiling al is afgelopen
        if (auctionEndDate < currentTime) {
            const highestBid = auction.bids.reduce((max, bid) => bid.bidAmount > max.bidAmount ? bid : max, {bidAmount: 0});

            // Kijk of de gebruiker het hoogste bod heeft
            if (highestBid.userId === userId) {
                auction.highestBid = highestBid; // Voeg het hoogste bod toe aan de veiling
                wonAuctions.push(auction); // Voeg de gewonnen veiling toe aan de array
            }
        }
    });

    // Bereken totaalbedrag van gewonnen veilingen
    const totalPayment = wonAuctions.reduce((total, auction) => total + auction.highestBid.bidAmount, 0);

    if (wonAuctions.length > 0) {
        return res.status(StatusCodes.OK).json({wonAuctions, totalPayment});
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'No won auctions found'});
    }
}


// Valideer de input van de gebruiker
export function validateInput(res, value, statusCode, errorMessage) {
    if (isNaN(value)) {
        res.status(statusCode).json({message: errorMessage});
        return false;
    }
    return true;
}

// Zoek game en retourneer deze
export function searchAndReturnGame(gameID, res, statusCode, errorMessage) {
    const game = games.find(game => game.gameId === gameID);
    if (!game) {
        res.status(statusCode).json({message: errorMessage});
        return null;
    }
    return game;
}

// Voeg gebruikersnaam toe aan biedingen
function addUsernamesToBids(bids) {
    return bids.map(bid => {
        const user = users.find(user => user.userId === bid.userId);
        return {...bid, username: user ? user.username : 'undefined'};
    });
}

