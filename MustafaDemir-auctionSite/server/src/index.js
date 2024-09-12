import express from 'express';
import bodyParser from 'body-parser'; // Gebruik import i.p.v. require

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory database
let games = [
  {
    gameID: 1,
    naam: 'Fifa24',
    genre: 'Sport',
    uitgeverij: 'EA',
  },
  {
    gameID: 2,
    naam: 'Call of Duty',
    genre: 'Action',
    uitgeverij: 'Activision',
  },
  {
    gameID: 3,
    naam: 'PES',
    genre: 'sport',
    uitgeverij: 'Konami',
  },
];

// In-memory database met biedingen
let bids = [
  {
    bidId: 1,
    gameID: 1,  // Fifa24
    bieder: 'john_doe',
    bedrag: 50
  },
  {
    bidId: 2,
    gameID: 2,  // Call of Duty
    bieder: 'jane_smith',
    bedrag: 70
  },
  {
    bidId: 3,
    gameID: 1,  // Fifa24
    bieder: 'alice_jones',
    bedrag: 55
  }
];

const users = [
  {
    username: 'mustafa',
    password: 'password123',  // In werkelijkheid zou je wachtwoorden versleutelen
  },
  {
    username: 'admin',
    password: 'admin123',
  },
];

//GET REQUESTS -----------------------------------------------------------------------------------------

//get all games
app.get('/games', (req, res) => {
  const naam = req.query.naam;
  const genre = req.query.genre;
  const uitgeverij = req.query.uitgeverij;

  const filteredGames = games.filter(game => {
    let isMatch = true;

    if (naam) {
      isMatch = isMatch && game.naam.toLowerCase() === naam.toLowerCase();
    }
    if (genre) {
      isMatch = isMatch && game.genre.toLowerCase() === genre.toLowerCase();
    }
    if (uitgeverij) {
      isMatch = isMatch && game.uitgeverij.toLowerCase() === uitgeverij.toLowerCase();
    }

    return isMatch;
  });
  res.json(filteredGames);
});

//get specific game
app.get('/games/:id', (req, res) => {
  const gameId = parseInt(req.params.id);

  // Check of het game-ID bestaat
  const game = games.find(game => game.gameID === gameId);
  if (!game) {
    return res.status(404).json({ error: `Game with ID ${gameId} not found` });
  }

  res.json({game});
});

//get all bids from a specific game
app.get('/games/:id/bids', (req, res) => {
  const gameId = parseInt(req.params.id);

  // Check of het game-ID bestaat
  const game = games.find(game => game.gameID === gameId);
  if (!game) {
    return res.status(404).json({ error: `Game with ID ${gameId} not found` });
  }

  // Filter biedingen op basis van het game-ID
  const gameBids = bids.filter(bid => bid.gameID === gameId);

  if (gameBids.length === 0) {
    return res.status(200).json({ message: 'No bids found for this game' });
  }

  res.json(gameBids);
});


//Login!!
app.get('/login', (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: 'Please enter a username or password'});
  }

    const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  return res.status(200).json({message: 'Logged in successfully!'})
});

//POST REQUESTS ---------------------------------------------------------------------------------------------

//PUT REQUESTS ---------------------------------------------------------------------------------------------

//DELETE REQUESTS ---------------------------------------------------------------------------------------------

//Delete game
app.delete('/games/:id', (req,res) => {
  const gameID = games.findIndex(g => g.gameID === parseInt(req.params.id));
  const findGames = games.find()
  if (gameID === -1) {
    return res.status(404).json({error: `Game with ID ${gameID} not found to delete`})
  }

  const deletedGame = games.splice(gameID,1);
  return res.status(200).json({message: `Game with ID ${gameID} has been successfully deleted`});
});

//Delete specific a bid on a specific auction.






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
