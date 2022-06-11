import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pokemonCollection = new Schema( {
  pokemons: [Number]
});

const PokemonCollection = mongoose.model('PokemonCollection', pokemonCollection);

export default PokemonCollection;