import mongoose from 'mongoose';
import sha256 from 'sha256';

const Schema = mongoose.Schema;

// console.log(mongoose);

const userSchema = new Schema({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  pokemons: [Number],
  berries: {
    type: Number,
    default: 0
  },
  // currentMood: '', // string or array? image and text.  maybe ID. to reference other collection.
  weeklyPokemon: [{
    pokemon: String,
    position: Number,
    date: Date,
  }],
  weeklyProgress: [{
    sessionCount: Number,
    cycleCount: Number,
    taskCompletionCount: Number,
    totalFocusTime: Number,
    totalBreakTime: Number,
    date: Date,
  }],
  // todos: [{
  //     text: String,
  //     dueDate: Date,
  //     completed: Boolean,
  //     totalTimeSpent: Number,
  //     tag: { String },
  //     subtasks: {
  //         text: String,
  //         dueDate: Date,
  //         completed: Boolean,
  //         timeSpent: Number,
  //     }
  // }]
});

/**
 * @param {*} password
 */
userSchema.methods.comparePassword = function comparePassword(password) {
  return this.hashedPassword === sha256(password);
};

const User = mongoose.model('User', userSchema);

export default User;
