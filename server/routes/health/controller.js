import { User } from "../users/model.js";
import { Health } from "./model.js";

export const calculateBMR = (gender, weight, height, age) => {
  const heightInCm = height * 100;
  const weightInKg = weight;

  let bmr = 0;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
  } else if (gender === "female") {
    bmr = 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * age;
  }

  return bmr;
};

export const calculateTDEE = (bmr, activityLevel) => {
  let tdee = 0;
  if (activityLevel === "sedentary") {
    tdee = bmr * 1.2;
  } else if (activityLevel === "lightly active") {
    tdee = bmr * 1.375;
  } else if (activityLevel === "moderately active") {
    tdee = bmr * 1.55;
  } else if (activityLevel === "very active") {
    tdee = bmr * 1.725;
  } else if (activityLevel === "super active") {
    tdee = bmr * 1.9;
  }

  return tdee;
};

export const calculateCalorieIntake = (
  gender,
  weight,
  weightUnit,
  height,
  heightUnit,
  age,
  activityLevel,
  healthGoals
) => {
  let weightInKg = weight;
  let heightInCm = height;

  if (weightUnit === "lbs") {
    weightInKg = weight * 0.453592;
  }

  if (heightUnit === "in") {
    heightInCm = height * 30.48;
  }

  const bmr = calculateBMR(gender, weightInKg, heightInCm, age);
  const tdee = calculateTDEE(bmr, activityLevel);
  let calorieIntake = tdee;

  if (healthGoals.includes("weight_loss")) {
    calorieIntake = Math.round(tdee * 0.8);
  } else if (healthGoals.includes("maintain_weight")) {
    calorieIntake = tdee;
  }

  if (healthGoals.includes("improve_blood_sugar")) {
    calorieIntake = Math.round(calorieIntake * 0.9);
  }

  if (healthGoals.includes("lower_blood_pressure")) {
    calorieIntake = Math.round(calorieIntake * 0.9);
  }

  if (healthGoals.includes("lower_cholesterol")) {
    calorieIntake = Math.round(calorieIntake * 0.9);
  }

  if (healthGoals.includes("improve_digestion")) {
    calorieIntake = Math.round(calorieIntake * 1.1);
  }

  if (healthGoals.includes("increase_energy")) {
    calorieIntake = Math.round(calorieIntake * 1.1);
  }

  return calorieIntake;
};

export const createHealth = async (req, res) => {
  try {
    const { userId } = req.params;
    const healthData = req.body;

    const health = new Health({
      ...healthData,
    });

    const newHealth = await health.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { health: newHealth._id },
      { new: true }
    ).exec();

    if (!user) {
      res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
