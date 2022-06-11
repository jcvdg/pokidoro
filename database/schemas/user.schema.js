import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import sha256 from 'sha256';

// console.log(mongoose);


const userSchema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    pokemons: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PokemonCollection'  // stored as an array
    },
    berries: 0,
    currentMood: '', // string or array? image and text.  maybe ID. to reference other collection.
    weeklyProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WeeklyProgress'
    }],
    pomodoroTime: [{ //array? of sessions/day
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailySessions'
    }],
    todos: [{ // 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ToDo'
    }]
});


/**
 * @param {*} password
 */
userSchema.methods.comparePassword = function comparePassword(password) {
    return this.hashedPassword === sha256(password);
};



export default userSchema;