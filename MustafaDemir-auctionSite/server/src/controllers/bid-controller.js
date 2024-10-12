import {games} from '../data/data.js';
import {users} from '../data/data.js';
import statusCodes, {StatusCodes} from 'http-status-codes';

// GET - all bids from a specific game
export function getBidsForGame(req, res) {
    const gameId = Number(req.params.id);

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Search the game and return if it exists.
    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} does not exist!`);
    if (!game) return;  // Als de game niet bestaat, stop de functie\
    // Check if there are bids and return them with username
    if (game.bids && game.bids.length > 0) {
        // Voeg voor elk bod de username toe door de user op te zoeken
        const bidsWithUsername = game.bids.map(bid => {
            const user = users.find(user => user.userId === bid.userId);
            const username = user ? user.username : 'undefined';  // Zoek naar de bijbehorende username
            return {...bid, username};  // Voeg de username toe aan het bod
        });

        // Retourneer de biedingen met usernames
        return res.status(StatusCodes.OK).json(bidsWithUsername);
    } else {
        return res.status(StatusCodes.OK).json({message: 'No bids found for this game'});
    }
}

// POST - new bid for a specific game
export function addBid(req, res) {
    const gameId = Number(req.params.id);
    const {bidAmount, bidTime, userId} = req.body;

    // Check if gameID is a number.
    if (!validateInput(res, gameId, StatusCodes.BAD_REQUEST, 'Invalid game ID')) return;

    // Search the game and return if it exists.
    const game = searchAndReturnGame(gameId, res, StatusCodes.NOT_FOUND, `Game with ID ${gameId} not found`);
    if (!game) return;

    // Controleer of de veiling is afgelopen (einddatum ligt in het verleden)
    const currentTime = new Date();
    const auctionEndTime = new Date(game.auctionEndDate);
    if (auctionEndTime < currentTime) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'The auction has already ended. You cannot place a bid on this game.'
        });
    }

    // Genereer een nieuwe bidId
    const newBidID = game.bids.length > 0 ? Math.max(...game.bids.map(bid => bid.bidId)) + 1 : 1;

    // Check if all required fields are filled (without bidId since it's auto-generated)
    if (!bidAmount || !bidTime || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing required fields'});
    }

    // Find the user by userId
    const user = users.find(user => user.userId === userId);
    const username = user ? user.username : 'undefined';

    // Bepaal het hoogste bod voor deze game
    const highestBid = game.bids.length > 0 ? Math.max(...game.bids.map(bid => bid.bidAmount)) : game.startingPrice;

    // Controleer of het bod hoger is dan het huidige hoogste bod
    if (bidAmount <= highestBid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: `Your bid must be higher than the current highest bid of €${highestBid}.`
        });
    }

    // Create new bid
    const newBid = {bidId: newBidID, bidAmount, bidTime, userId, username, gameId};
    game.bids.push(newBid); // Voeg het nieuwe bod toe aan de game

    return res.status(StatusCodes.CREATED).json({message: 'Bid added successfully', bid: newBid});
}


export function getWonAuctions(req, res) {
    const userId = req.user.userId; // Ensure correct key for userId
    const currentTime = new Date(); // Current time

    // Fetch all auctions
    const auctions = games;

    console.log('Current time:', currentTime); // Log current time for debugging
    console.log('Fetched auctions:', auctions); // Log fetched auctions for debugging

    // Create a list of won auctions
    const wonAuctions = auctions.filter(auction => {
        const auctionEndDate = new Date(auction.auctionEndDate);
        console.log(`Auction ID ${auction.gameId} end date: ${auctionEndDate}, current time: ${currentTime}`);

        // Check if the auction has ended
        if (auctionEndDate < currentTime) {
            // Find the highest bid
            const highestBid = auction.bids.reduce((max, bid) => bid.bidAmount > max.bidAmount ? bid : max, {bidAmount: 0});
            console.log(`Highest bid for auction ${auction.gameId}:`, highestBid);

            // Check if the highest bid belongs to the user
            if (highestBid.userId === userId) {
                console.log(`User ${userId} has won auction ${auction.gameId}`);
                auction.highestBid = highestBid; // Add highest bid to auction object
                return true; // Add this auction to the list of won auctions
            }
        }
        return false; // If the auction is not ended or the user does not have the highest bid
    });

    console.log('Won auctions:', wonAuctions); // Log won auctions for debugging

    // Calculate total payment
    const totalPayment = wonAuctions.reduce((total, auction) => total + auction.highestBid.bidAmount, 0);

    // Return the list of won auctions and total payment
    return res.status(200).json({wonAuctions, totalPayment});
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
    game.bids = game.bids.map(bid => { return {
        ...bid,
        username: bid.userId
    }
    })
    if (!game) {
        res.status(statusCode).json({message: errorMessage});
        return null;
    }
    return game;
}
