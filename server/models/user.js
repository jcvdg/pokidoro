import mongoose from 'mongoose';
import sha256 from 'sha256';
import Pokedex from './pokedex.js';

const Schema = mongoose.Schema;

// console.log(mongoose);

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true,
    lowercase: true,
   },
  hashedPassword: { type: String, required: true },
  pokemons: [{
    // type: Number,
    type: Schema.Types.ObjectId,
    ref: 'pokedex',
  }],
  berries: {
    type: Number,
    default: 0
  },
  // currentMood: '', // string or array? image and text.  maybe ID. to reference other collection.
  weeklyGraph: [{
    pokemon: String,
    position: Number,
    date: Date,
  }],
  weeklyStats: [{
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
  // }],
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  }
});

/**
 * @param {*} password
 */
userSchema.methods.comparePassword = function comparePassword(password) {
  return this.hashedPassword === sha256(password);
};

const User = mongoose.model('User', userSchema);

export default User;
