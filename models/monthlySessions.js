import mongoose from "mongoose";
const Schema = mongoose.Schema;

const monthlySessions = new Schema({ // updated after break time completes
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: () => new Date,
  },
  // dailySessions: {
  //   type: [{
  //     date: Date,
  session: {
    type: [{
      sessionDateTime: Date,
      focusTime: Number,
      breakTime: Number,
      // mood: String,
      task: [
        {
          taskId: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
          }],
        },
      ],
    }],
    default: [],
  },
  totalSessionCount: {
    type: Number,
    default: 0,
  },
  totalCycleCount: {
    type: Number,
    default: 0,
  },
  //   }],
  //   default: [],
  // },
});

const MonthlySessions = mongoose.model('MonthlySessions', monthlySessions);

export default MonthlySessions;
