// MustafaDemir-auctionSite/server/src/routes/user-router.js

import express from "express";
import {
    getAllUsers,
    getAllBidsFromUser,
    addUser,
    loginUser
} from "../controllers/user-controller.js";
import {verifyToken} from "../middleware/AuthMW.js";
import {admin_only} from "../middleware/adminLogin.js";

const router = express.Router();

router.get("/", verifyToken, admin_only, getAllUsers);
router.get('/users/admin', verifyToken, admin_only);
router.get("/:userId/bids", verifyToken, getAllBidsFromUser);
router.post("/register", addUser);
router.post("/login", loginUser);

export default router;