import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

// Gebruik body-parser om JSON request bodies te parsen
app.use(bodyParser.json());

// Bepaal __dirname voor ES-modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statische bestanden in de map 'public'
const publicPath = path.join(__dirname, '../../client/public');
app.use(express.static(publicPath));

// Zorg ervoor dat de map 'data' toegankelijk is voor statische bestanden
app.use('/server/data', express.static(path.join(__dirname, 'src/data')));

// Laad games.json in
const gamesFilePath = path.join(__dirname, 'src/data/games.json');
let games = JSON.parse(fs.readFileSync(gamesFilePath, 'utf-8'));

// Optioneel: API-route om games op te halen
app.get('/games', (req, res) => {
  res.json(games);
});

// Optioneel: API-route om games op te halen
app.get('/games', (req, res) => {
  res.json(games);
});

// Optioneel: je kunt een specifieke route maken om de JSON te serveren
app.get('/games', (req, res) => {
  res.json(games);
});
//get specific game - 2
app.get('/games/:id', (req, res) => {
  const gameId = parseInt(req.params.id);

  // Check of het game-ID bestaat
  const game = games.find(game => game.gameID === gameId);
  if (!game) {
    return res.status(404).json({ error: `Game with ID ${gameId} not found` });
  }

  res.json({game});
});

//get all bids from a specific game - 3
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


//Login!! - 4
app.get('/users/:id', (req, res) => {
  const userID = parseInt(req.params.id);  // Haal de gebruikers-ID uit de URL path parameter

  // Zoek naar de gebruiker in de 'users' array op basis van de ID
  const user = users.find(u => u.userID === userID);

  // Als de gebruiker niet wordt gevonden, stuur een 400 response
  if (!user) {
    return res.status(400).json({ error: 'Gebruiker niet gevonden' });
  }

  // Als de gebruiker is gevonden, stuur de gegevens van de gebruiker
  return res.status(200).json({
    message: 'Succesvol gebruiker gevonden',
    user: user
  });
});

//POST REQUESTS -----------------------------------------------------------------------------------------------

//Add game -1
app.post('/games', (req, res) => {
  const { naam, genre, uitgeverij } = req.body;

  // Check of alle vereiste parameters aanwezig zijn
  if (!naam || !genre || !uitgeverij) {
    return res.status(400).json({ error: 'Invalid input. Please provide all required fields: naam, genre, uitgeverij.' });
  }

  // Genereer een nieuw gameID
  const newGameID = games.length > 0 ? Math.max(...games.map(game => game.gameID)) + 1 : 1;

  // Voeg de nieuwe game toe
  const newGame = {
    gameID: newGameID,
    naam,
    genre,
    uitgeverij
  };

  games.push(newGame);

  res.status(201).json(newGame);
});

//Add bid to a specific game -2
app.post('/games/:id/bids', (req, res) => {
  const gameID = parseInt(req.params.id); // Haal gameID uit de URL
  const { bieder, bedrag } = req.body;

  if (!bieder || !bedrag) {
    return res.status(400).json({ error: 'Invalid input. Please provide all required fields: bieder, bedrag.' });
  }

  // Controleer of het spel bestaat
  const gameExists = games.find(game => game.gameID === gameID);
  if (!gameExists) {
    return res.status(404).json({ error: `Game with ID ${gameID} not found.` });
  }

  const newBidID = bids.length > 0 ? Math.max(...bids.map(bid => bid.bidId)) + 1 : 1;

  const newBid = {
    bidId: newBidID,
    gameID: gameID, // Gebruik gameID van de URL
    bieder,
    bedrag
  };

  bids.push(newBid);

  res.status(201).json(newBid);
});

//PUT REQUESTS ------------------------------------------------------------------------------------------------
app.put('/games/:id', (req, res) =>  {
  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter a username and password' });
  }

  // Find the user with the provided username
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if the password matches
  if (user.password !== password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  // If both username and password are correct
  return res.status(200).json({ message: 'Logged in successfully!' });

});
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
app.delete('/games/:id/bids/:bidid', (req, res) => {
  const gameID = parseInt(req.params.id);     // Haal gameID uit de URL
  const bidID = parseInt(req.params.bidid);   // Haal bidID uit de URL

  // Controleer of het spel met het opgegeven ID bestaat
  const gameExists = games.find(game => game.gameID === gameID);
  if (!gameExists) {
    return res.status(404).json({ error: `Veiling met ID ${gameID} niet gevonden` });
  }

  // Zoek naar het bod met het opgegeven bidID en gameID
  const bidIndex = bids.findIndex(bid => bid.bidId === bidID && bid.gameID === gameID);

  // Als het bod niet wordt gevonden, stuur een 404 response
  if (bidIndex === -1) {
    return res.status(404).json({ error: `Bod met ID ${bidID} niet gevonden in veiling met ID ${gameID}` });
  }

  // Verwijder het bod
  const deletedBid = bids.splice(bidIndex, 1);

  // Stuur een succes response
  return res.status(200).json({ message: `Bod met ID ${bidID} is succesvol verwijderd van veiling ${gameID}`, bid: deletedBid });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
