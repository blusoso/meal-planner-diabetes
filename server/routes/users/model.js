import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  activity_level: {
    type: String,
  },
  is_set_preference: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // healthInfo: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Health",
  // },
});

export const User = mongoose.model("users", UserSchema);
