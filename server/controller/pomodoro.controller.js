// import express from 'express';
// import passport from 'passport';
// import sha256 from 'sha256';
// import jwt from 'jsonwebtoken';
// import { validationResult } from 'express-validator';
// import { config } from '../store/config.js';
// import User from '../models/index.js';
// import {
//   generateHashedPassword,
//   generateServerErrorCode,
//   registerValidation,
//   loginValidation
// } from '../store/utils.js';
// import {
//   SOME_THING_WENT_WRONG,
//   USER_EXISTS_ALREADY,
//   WRONG_PASSWORD,
//   USER_DOES_NOT_EXIST,
// } from '../store/constant.js';

// const pomodoroController = express.Router();

// pomodoroController.get(
//   '/berries',
//   passport.authenticate('jwt', {session: false}),
//   (req, res) => {
    
//   }
// );

// userController.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     User.find({}, (err, result) => {
//       res.status(200).json({
//         data: result,
//       });
//     });
//   }
// );
