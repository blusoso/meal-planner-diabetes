import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
  },
  ingredients: {
    type: [
      {
        amount: {
          type: Number,
        },
        unit: {
          type: String,
        },
        prep: {
          type: String,
        },
        ingredient: {
          type: String,
          required: true,
        },
      },
    ],
  },
  calories: {
    type: String,
  },
  protein: {
    type: String,
  },
  carbohydrates: {
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
  cookingTime: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const MealPlan = mongoose.model("meal_plans", MealPlanSchema);
