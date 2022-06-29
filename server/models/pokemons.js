import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pokemon = new Schema( {
    _id: { 
      type: Schema.ObjectId, 
      auto: true 
    },
    name: String,
    pokemonId: Number,
    evolvesTo: Number,
    image: {
      small: String,
      large: String
    }
});

const Pokemons = mongoose.model('Pokemon', pokemon);

export default Pokemons;