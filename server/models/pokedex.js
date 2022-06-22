import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Pokemon = new Schema( 
  {
    _id: Schema.Types.ObjectId,
    name: String,
    pokemonId: Number,
    evolvesTo: Number,
    image: {
      small: String,
      large: String
    }
  }
);

// const pokedex = new Schema(
//   {
//     all: [ {
//       type: Schema.Types.ObjectId,
//       type: mongoose.SchemaTypes.ObjectId
//       ref: 'Pokemon',
//     } ]
//   } ,
// );


const pokedex = new Schema(
  {
    all: [ Pokemon ]
  } ,
);

const Pokedex = mongoose.model('Pokedex', pokedex);

export default Pokedex;