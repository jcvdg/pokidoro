import express from 'express';
import User, {Character} from '../database/models/index.js'
import sha256 from 'sha256';

// Express Router is a class which helps us to create router handlers. It also can extend this routing to handle validation, handle 404 or other errors, etc.
const userController = express.Router();

// userController.get('/', (req, res) => {
//    res.status(200).json({
//       status: 'user Controller API call successfully'
//    });
// });

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
userController.get('/', (req, res) => {
  User.find({name:'Mary'}, (err, result) => {
    res.status(200).json({
      data: result
    });
  });
});

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
 userController.get('/character', (req, res) => {
  Character.find({}, (err, result) => {
    res.status(200).json({
      data: result
    });
  });
});
  /**
   * POST/
   * Add a new User to your database
   */
userController.post('/add-user', (req, res) => {
  const { email, password } = req.body;
  const userData = {
    email,
    hashedPassword: sha256(password)
  };
  const newUser = new User(userData);
  newUser
    .save()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
  


export default userController;