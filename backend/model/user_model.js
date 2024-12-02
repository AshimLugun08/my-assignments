import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Only allows 'user' or 'admin' as values
      default: 'user' // Default role is 'user'
    },
    date: {
      type: Date,
      default: Date.now
    }
  });


const Usermodal = mongoose.model('User', userSchema);
export default Usermodal