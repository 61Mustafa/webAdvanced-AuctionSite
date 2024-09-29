import express from 'express';
import {
    getBidsForGame,
    addBid
} from "../controllers/bid-controller.js";

const router = express.Router();

router.get('/:id/bids', getBidsForGame);
router.post('/:id/bids', addBid);

export default router;
