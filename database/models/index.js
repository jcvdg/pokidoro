import User from './user.model.js';
import PokemonCollection from './pokemonCollection.js';
import DailySessions from './dailySessions.js';
import Pokedex from './pokedex.js';
import Tasks from './tasks.js';
import Character from './Character.js';
import WeeklyProgress from './weeklyProgress.js';

// const PokemonCollection = () => {};
// const Character = () => {};

export {PokemonCollection, DailySessions, Pokedex, Tasks, WeeklyProgress, Character};

export default User;


// const ryu = new Character( {
//    name: 'Ryu',
//    ultimate: 'Shinku Hadoken'
// })

// ryu.save( function (err, document) {
//    if (err) console.error(err);
//    console.log(document);
// })

// async function runCode() {
//    const ryu = new Character({
//      name: 'Ryu',
//      ultimate: 'Shinku Hadoken'
//    })
 
//    const doc = await ryu.save()
//    console.log(doc)

//    const chars = await Character.find( {name: 'Ryu'})
//    console.log( {chars});
//  }
 
//  runCode()
//    .catch(error => { console.error(error) })



// async function runUserCode() {
//    const mary = new User( {
//       email: 'test3423433@gmail.com',
//       hashedPassword: 'meow'
//    })
 
//    const doc = await mary.save()
//    console.log(doc)

//    const chars = await User.find( {email: 'test3423433@gmail.com'})
//    console.log( {chars});
//  }
 
//  runUserCode()
//    .catch(error => { console.error(error) })



// export default {
//    User,
// };
