import express from "express";
import gameRouter from "./routes/game-router.js";
import bidRouter from "./routes/bid-router.js";
import userRouter from "./routes/user-router.js";
import * as path from "node:path";
import {fileURLToPath} from 'url';


const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/photos', express.static(path.join(__dirname, 'data', 'photos')));

app.use('/games', gameRouter, bidRouter);
//app.use('/bids', bidRouter);
app.use('/users', userRouter);

app.use(function (err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong!'
        });
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});
