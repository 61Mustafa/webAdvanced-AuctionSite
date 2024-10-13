import {games} from '../data/data.js';
import {users} from '../data/data.js';
import statusCodes, {StatusCodes} from 'http-status-codes';

// GET - Specifieke game
export function getBidsForGame(req, res) {
    const gameId = Number(req.params.id);

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} does not exist!`);
    if (!game) return;

    // Voeg de gebruikersnaam toe aan het bod
    if (game.bids && game.bids.length > 0) {
        const bidsWithUsername = game.bids.map(bid => {
            const user = users.find(user => user.userId === bid.userId);
            const username = user ? user.username : 'undefined';
            return {...bid, username};
        });
        return res.status(StatusCodes.OK).json(bidsWithUsername);
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'No bids found for this game'});
    }
}

// POST -  Nieuwe bod
export function addBid(req, res) {
    const gameId = Number(req.params.id);
    const {bidAmount, bidTime, userId} = req.body;

    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;

    // Controleer of de veiling in het verleden is.
    const currentTime = new Date();
    const auctionEndTime = new Date(game.auctionEndDate);
    if (auctionEndTime < currentTime) {
        return res.status(StatusCodes.PRECONDITION_FAILED).json({
            message: 'The auction has already ended. You cannot place a bid on this game.'
        });
    }

    // Nieuwe bidID is 1tje hoger dan de laatste BidID
    const newBidID = game.bids.length > 0 ? Math.max(...game.bids.map(bid => bid.bidId)) + 1 : 1;

    if (!bidAmount || !bidTime || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Zoek de gebruiker op basis van de userId
    const user = users.find(user => user.userId === userId);
    const username = user ? user.username : 'undefined';

    // Bepaal het hoogste bod voor deze game
    const highestBid = game.bids.length > 0 ? Math.max(...game.bids.map(bid => bid.bidAmount)) : game.startingPrice;

    // Controleer of het bod hoger is dan het huidige hoogste bod
    if (bidAmount <= highestBid) {
        return res.status(StatusCodes.PRECONDITION_FAILED).json({
            message: `Your bid must be higher than the current highest bid of €${highestBid}.`
        });
    }

    // Maak nieuwe bod aan
    const newBid = {bidId: newBidID, bidAmount, bidTime, userId, username, gameId};
    game.bids.push(newBid); // Voeg het nieuwe bod toe aan de game

    return res.status(StatusCodes.CREATED).json({message: 'Bid added successfully', bid: newBid});
}


export function getWonAuctions(req, res) {
    const userId = req.user.userId;
    const currentTime = new Date();

    // Haal alle games op
    // Maak lijst aan van gewonnen veilingen
    const wonAuctions = games.filter(auction => {
        const auctionEndDate = new Date(auction.auctionEndDate);
        console.log(`Auction ID ${auction.gameId} end date: ${auctionEndDate}, current time: ${currentTime}`);

        // Check of de veiling al is afgelopen
        if (auctionEndDate < currentTime) {

            const highestBid = auction.bids.reduce((max, bid) => bid.bidAmount > max.bidAmount ? bid : max, {bidAmount: 0});
            console.log(`Highest bid for auction ${auction.gameId}:`, highestBid);

            // Kijk of de gebruiker het hoogste bod heeft
            if (highestBid.userId === userId) {
                console.log(`User ${userId} has won auction ${auction.gameId}`);
                auction.highestBid = highestBid;
                return res.status(StatusCodes.OK).json({wonAuctions, totalPayment});
            }
        }
        return res.status(StatusCodes.NOT_FOUND).json({message: 'No won auctions found'});
    });

    // Bereken totaalbedrag van gewonnen veilingen
    const totalPayment = wonAuctions.reduce((total, auction) => total + auction.highestBid.bidAmount, 0);

    return res.status(StatusCodes.OK).json({wonAuctions, totalPayment});
}

//Valideer de input van de gebruiker
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
