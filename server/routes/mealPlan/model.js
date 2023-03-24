import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  mealName: {
    type: String,
    required: true,
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
    required: true,
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

export const MealPlan = mongoose.model("mealPlans", MealPlanSchema);
