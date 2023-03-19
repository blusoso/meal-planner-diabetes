import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
  bloodSugarLevel: {
    type: Number,
  },
  medications: {
    type: [String],
  },
  healthConditions: {
    type: [String],
  },
  mealAmount: {
    type: Number,
  },
  fasting: {
    type: String,
  },
  foodAllergies: {
    type: [String],
  },
  diabetes: {
    type: String,
  },
  sugarIntakeGram: {
    type: Number,
  },
  healthGoals: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Health = mongoose.model("health", HealthSchema);
