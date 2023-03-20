import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NutritionSchema = new Schema({
  name: {
    type: String,
  },
  carbohydrate: {
    type: String,
  },
  protein: {
    type: String,
  },
  fat: {
    type: String,
  },
  fiber: {
    type: String,
  },
  sodium: {
    type: String,
  },
  cholesterol: {
    type: String,
  },
  saturatedFat: {
    type: String,
  },
  transFat: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Nutrition = mongoose.model("nutrition", NutritionSchema);
