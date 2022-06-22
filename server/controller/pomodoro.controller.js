import express from 'express';
import passport from 'passport';
import User, { Pokemons } from '../models/index.js';


const pomodoroController = express.Router();

// return amount of berries user has
pomodoroController.get(
  '/berries',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const userid = req.user._id
    
    User.findById(userid, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result.berries)
        // res.json(result.berries); // User object with the userid from the jwt token
        res.json(result.berries); // User object with the userid from the jwt token
      }
    });

    // User.find({}, (err, result) => {
    //         res.status(200).json({
    //           data: result,
    //         });
    //       });

  }
);

// update user's berries count (positive/negative count)
pomodoroController.put(
  '/berries/:count',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const count = Number(req.params.count);
      let user = await User.findById(req.user._id);
      user.berries = Number(user.berries) + count;
      user.save();

      res.json(
        {message: `berries updated by ${count}`}
      )
    } catch (e) {
       console.log( e.message );
    }
  }
);


// pomodoroController.put(
//   '/berries/:count',
//   passport.authenticate('jwt', {session: false}),
//   async (req, res) => {
//     try {
//       const count = Number(req.params);
//       const userid = req.user._id
//       let user = await User.findById(userid);
//       user.berries = Number(user.berries) + count;
//       user.save();

//       res.json(
//         {message: `berries updated by ${count}`}
//       )
//     } catch (e) {
//       console.log( e.message );
//     }
//   }
// );

// return data to generate weekly graph
pomodoroController.get(
  '/weeklyGraph',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const userid = req.user._id
    User.findById(userid, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log('weeklygraph ', result.weeklyGraph)
        // res.json(result.berries); // User object with the userid from the jwt token
        res.json(result.weeklyGraph); // User object with the userid from the jwt token
      }
    });
  }
);

const events = []

// randomly determines an event for after user completes a pomodoro session.
pomodoroController.get(
  '/event',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      // get a random event: new pokemon, levelup existing pokemon, get a berry
      const events = 
        {
          GET_BERRIES: 5,
          GET_POKEMON: 7,
          EVOLVE: 9,
        };
      // check if user has any pokemon with evolve: true
      let eventsIncludes;
      let count = await Pokemons.count();
      console.log('count', User.aggregate())
      let user = await User.findById(req.user._id).populate("pokemons");

      console.log(user)

      const event = Math.floor(Math.random()*9);
      switch(event){
        // get a berrie
        case (event < events['GET_BERRIES']):

          break;
  
        // get a pokemon
        case (event < events['GET_POKEMON']):
          
          break;
  
        // levelup a Pokemon
        case ( event < events['EVOLVE']):

          break;
        default:
          break;
  
      }

    } catch (e) {
      console.log(e.message);
    }

    res.status(200).json({
      event: '',
      data: '', // pokemon image url
    });

  }
);

//temporary api
// get new pokemon
pomodoroController.put(
  '/newpokemon', 
  passport.authenticate('jwt', {session: false}),
  async (req,res) => {
    try {
      let randomPokemonId;
      let userPokemonIds = [];
      const userid = req.user._id;
      const user = await User.findById(userid)
        .populate('pokemons')
        .exec();
        // console.log(user);
        // console.log('populated user: ', user);
        userPokemonIds = user.pokemons.map( x => x.pokemonId)
        // console.log('pokemons: ', userPokemonIds)

        // get a pokemon that the user doesn't already have
        do {
          randomPokemonId = Math.ceil(Math.random()*151);
          // console.log('randomPokemon: ', randomPokemonId)
        } while( userPokemonIds.includes(randomPokemonId) )

        console.log('we\'re getting ', randomPokemonId)
      
      // get new pokemon's _id to save to the user's pokemons property
      const pokemonObject = await Pokemons.findOne({pokemonId: randomPokemonId}).exec();
      user.pokemons.push(pokemonObject._id);
      user.save();
      // console.log(pokemonObject)
      // console.log(pokemonObject._id)
      // console.log('SAVED')
      res.json(pokemonObject)

    } catch (e) {
      console.log(e.message)
    }
  }
);




export default pomodoroController;

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

// userController.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {

//     // const userid = req.user._id
//     // User.findById(userid, function(err, result) {
//     //   if (err) {
//     //     res.send(err);
//     //   } else {
//     //     res.json(result); // User object with the userid from the jwt token
//     //   }
//     // });
//     User.find({}, (err, result) => {
//       // console.log(req.user) // { email: 'jeanniesss1@gdmail.comdddddssd', _id: new ObjectId("62b008beb579f7341d25faee") }
//       // console.log(req.user._id) // new ObjectId("62b008beb579f7341d25faee")
//       res.status(200).json({
//         data: result,
//       });
//     });
//   }
// );