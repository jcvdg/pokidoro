import mongoose from "mongoose";
const Schema = mongoose.Schema;

const monthlySessions = new Schema({
  userId: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  startDate: Date,
  dailySessions: {
    date: Date,
    session: {
      dateTime: Date,
      studyTime: Number,
      focusTime: Number,
      // mood: String,
      task: [
        {
          taskId: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
          }],
        },
      ],
    },
    totalSessionCount: Number,
    totalCycleCount: Number,
  },
});

const MonthlySessions = mongoose.model('MonthlySessions', monthlySessions);

export default MonthlySessions;
