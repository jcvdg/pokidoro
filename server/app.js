// Import all dependencies & middleware here
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'winston';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import { applyPassportStrategy } from './store/passport.js';
import { userController, pomodoroController } from './controller/index.js';
import { populatePokedex } from './store/populatePokedex.js'

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
populatePokedex();

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

// Start Server here
app.listen(8080, () => {
  console.log('Server is running on port 8080!');
});
