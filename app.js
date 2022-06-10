// Import all dependencies & middleware here
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userController from './controller/user.controller.js';
import mongoose from "mongoose";

dotenv.config();

// Connect to the database
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true} ) // for debugging if connection succeeded or failed
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected!')
})

db.on('error', err => {
  console.error('connection error:', err)
})

// Init an Express App. 
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use all controllers(APIs) here
app.use('/', userController);

// Start Server here
app.listen(8080, () => {
   console.log('Server is running on port 8080!');
});