import express from "express";
import gameRouter from "./routes/game-router.js";
import bidRouter from "./routes/bid-router.js";
import userRouter from "./routes/user-router.js";
import cors from 'cors';
import * as path from "node:path";
import {fileURLToPath} from 'url';


const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

// Maak de photos folder beschikbaar
app.use('/photos', express.static(path.join(__dirname, 'data', 'photos')));
app.use('/games', gameRouter);
app.use('/', bidRouter)
app.use('/users', userRouter);

// Geef foutmelding terug als er een conflict ontstaat bij de server
app.use(function (err, req, res) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong!'
        });
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});
