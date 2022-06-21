import Pokedex from '../models/pokedex.js';

export const populatePokedex = async () => {
  try {
    let count = await Pokedex.count()

    if(count != 0) {
      console.log(`pokedex is already populated: ${count}`)
      return;
    }

    const MAX_POKEMON_ID = 151 //original is 151
    let pokemons = { all:[] };
    for( let i=1; i<=MAX_POKEMON_ID; i++) {
      // get pokemon data
      let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      let data = await result.json();

      // put the necessary data into an object
      let pokemon = {
        name: data.name,
        pokemonId: data.id,
        image: {
          small: data['sprites']['front_default'],
          large: data['sprites']['other']['official-artwork']['front_default'],
        },
      }

      // add pokemon to array
      pokemons.all.push(pokemon)
    }

    // save pokemons to the database
    const newPokemonObject = new Pokedex(pokemons);
    newPokemonObject.save();

  } catch (e) {
    console.log(e.message);
  }
};
