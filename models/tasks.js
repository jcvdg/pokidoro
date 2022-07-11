import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tasks = new Schema( {
  userId: Number,
  subTasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tasks',
  }],
  timeSpent: Number,
  complete: Boolean
});

const Tasks = mongoose.model('Tasks', tasks);

export default Tasks;
