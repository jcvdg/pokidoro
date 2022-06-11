import mongoose from "mongoose";
const Schema = mongoose.Schema;

const weeklyProgress = new Schema( {
  completedSession: {
    userId: Number,
    date: Date,
    pokemonId: Number,
    position: Number
  }
});

const WeeklyProgress = mongoose.model('WeeklyProgress', weeklyProgress);

export default WeeklyProgress;