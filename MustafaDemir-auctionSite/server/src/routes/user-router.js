import express from "express";
import {
    getAllUsers,
    getAllBidsFromUser,
    addUser,
    loginUser
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId/bids", getAllBidsFromUser);
router.post("/", addUser);
router.post("/login", loginUser);

export default router;
