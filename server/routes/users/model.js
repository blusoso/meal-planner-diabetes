import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
  weightUnit: {
    type: String,
  },
  height: {
    type: Number,
  },
  heightUnit: {
    type: String,
  },
  activityLevel: {
    type: String,
  },
  calorieIntake: {
    type: Number,
  },
  weightGoal: {
    type: Number,
  },
  isSetPreference: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  health: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "health",
  },
});

export const User = mongoose.model("users", UserSchema);
