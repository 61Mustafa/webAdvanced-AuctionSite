import express from 'express';
import {
    getAllGames,
    getSpecificGame,
    addGame,
    updateGame,
    deleteGame
} from "../controllers/game-controller.js";

const router = express.Router();

router.get('/', getAllGames);
router.get('/:id', getSpecificGame);
router.post('/', addGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;