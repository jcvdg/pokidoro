import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dailySessions = new Schema( {
  day: {
    userId: Number,
    date: Date,
    studyTime: Number,
    focusTime: Number,
    sessionCount: Number,
    cycleCount: Number
  }
});

const DailySessions = mongoose.model('DailySessions', dailySessions);

export default DailySessions;