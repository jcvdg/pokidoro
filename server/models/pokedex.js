import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pokedex = new Schema({
  pokemon: {
    id: { type: Number, unique: true} ,
    name: String,
    description: String,
    image: {
      small: String,
      large: String
    }
  }
});

const Pokedex = mongoose.model('Pokedex', pokedex);

export default Pokedex;