// Import all dependencies & middleware here
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'winston';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { applyPassportStrategy } from './store/passport.js';
import { userController, pomodoroController, updateDataController } from './controller/index.js';
import { populatePokemons } from './store/populatePokemons.js';

dotenv.config();

// Connect to the database
// for debugging if connection succeeded or failed
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected!');
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

// Fetches pokemon data from pokeapi
// should only be executed once when the project is first run.
populatePokemons();

// Init an Express App.
const app = express();

// Use your dependencies here
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Apply strategy to passport
applyPassportStrategy(passport);

// use all controllers(APIs) here
app.use('/', userController);
app.use('/', pomodoroController);
app.use('/', updateDataController);

//
const dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/client/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html')));
}

// Start Server here
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${8080}!`);
});
