import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema.js';

const User = mongoose.model('User', userSchema);

// module.exports = mongoose.model('User', characterSchema);


export default User;