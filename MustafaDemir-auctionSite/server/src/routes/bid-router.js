import express from 'express';
import {
    getBidsForGame,
    addBid, getWonAuctions
} from "../controllers/bid-controller.js";
import {verifyToken} from "../middleware/AuthMW.js";
import {user_only} from "../middleware/userLogin.js";

const router = express.Router();
router.get('/games/:id/bids', getBidsForGame);
router.get('/won-auctions', verifyToken, getWonAuctions);
router.post('/games/:id/bids', verifyToken,user_only, addBid);

export default router;