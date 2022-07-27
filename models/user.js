import mongoose from 'mongoose';
import sha256 from 'sha256';
import Pokemons from './pokemons.js'

const Schema = mongoose.Schema;

// const weeklyStats = new Schema( {
//   date: {
//     Date: 
//   },
//   sessionCount: Number,
//   cycleCount: Number,
//   taskCompletionCount: Number,
//   totalFocusTime: Number,
//   totalBreakTime: Number,
// })

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true,
    lowercase: true,
   },
  hashedPassword: { type: String, required: true },
  pokemons: [{ // updated after focus time
    // type: Number,
    type: Schema.Types.ObjectId,
    ref: 'Pokemon',
  }],
  berries: { // updated after focus time
    type: Number,
    default: 0
  },
  // currentMood: '', // string or array? image and text.  maybe ID. to reference other collection.
  weeklyGraph: [{ // updated after focus time
    image: String,
    position: Number,
    date: Date,
  }],
  weeklyStats: {
    type: [{ // updated after break time completes
      date: Date,
      sessionCount: Number,
      cycleCount: Number,
      taskCompletionCount: Number,
      totalFocusTime: Number,
      totalBreakTime: Number,
    }],
    default: [],
  },
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
