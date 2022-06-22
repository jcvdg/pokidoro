import Pokemons from '../models/pokemons.js';

export const populatePokemons = async () => {
  try {
    let count = await Pokemons.count()

    if(count != 0) {
      console.log(`pokemon table is already populated: ${count}`)
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
        // _id: new ObjectId,
        name: data.name,
        pokemonId: data.id,
        image: {
          small: data['sprites']['front_default'],
          large: data['sprites']['other']['official-artwork']['front_default'],
        },
      }

     

      // save pokemon to the database
      const newPokemonObject = new Pokemons(pokemon);
      await newPokemonObject.save();

    }

    // add Pokemon's evolution data from another pokeapi endpoint
    addEvolutionData();

  } catch (e) {
    console.log(e.message);
  }
};

// get pokemon's evolution data from pokeapi
export const addEvolutionData = async () => {
  try {
    //loop till 78, which is mewtwo, as the api data is nested
    for ( let i=1; i<=78; i++) {
      const result = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
      const data = await result.json();
      
      // check if the pokemon is a baby (not original 151), and that the pokemon does evolve to another pokemon
      if (!data.chain.is_baby && data.chain.evolves_to.length > 0) {
        const id = getPokemonId( data.chain.species.url )
        // call helper function to get the evolved pokemon's info and save to database
        await getPokemonEvolution( id , data.chain.evolves_to[0] )
      }
    }

  } catch(e) {
    console.log(e.message);
  };
};

//helper function - get the pokemon id from the url
const getPokemonId = (url) => {
  const id = url.split('/')[6];
  return Number(id);
};

//helper function to save data into the db
const getPokemonEvolution = async (pokemonId, evolvedPokemonData) => {
  try {
    const evolvedPokemonId = getPokemonId( evolvedPokemonData.species.url );

    // check if the pokemon is not part of the original 151
    if( pokemonId > 151) return;

    // if there's more pokemon to evolve in the evolution chain
    if( evolvedPokemonData.evolves_to.length > 0 && !evolvedPokemonData.is_baby) {
      getPokemonEvolution(evolvedPokemonId, evolvedPokemonData.evolves_to[0])
    }
  
    // add evolvedPokemonId to the 'evolvesTo' property in the db
    const doc = await Pokemons.findOne({'pokemonId': pokemonId})
    doc.evolvesTo = evolvedPokemonId;
    await doc.save();
    
  } catch(e) {
    console.log(e.message);
  }
};
