import express from "express";
import {
    addUser,
    loginUser
} from "../controllers/user-controller.js";
import {verifyToken} from "../middleware/AuthMW.js";
import {admin_only} from "../middleware/adminLogin.js";

const router = express.Router();

router.get('/users/admin', verifyToken, admin_only);
router.post("/register", addUser);
router.post("/login", loginUser);

export default router;