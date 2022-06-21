import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Pokemon = new Schema( 
  {
    name: String,
    pokemonId: Number,
    image: {
      small: String,
      large: String
    }
  }
);

const pokedex = new Schema(
  {
    all: [ Pokemon ]
  } ,
);

const Pokedex = mongoose.model('Pokedex', pokedex);

export default Pokedex;