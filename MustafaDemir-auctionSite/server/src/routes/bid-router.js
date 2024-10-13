import express from 'express';
import {
    getBidsForGame,
    addBid, getWonAuctions
} from "../controllers/bid-controller.js";
import {verifyToken} from "../middleware/AuthMW.js";

const router = express.Router();
router.get('/:id/bids', getBidsForGame);
router.get('/won-auctions', verifyToken, getWonAuctions);
router.post('/:id/bids', verifyToken, addBid);

export default router;