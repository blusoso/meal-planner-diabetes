import { User } from "../users/model.js";
import { Nutrition } from "../nutrition/model.js";
import { Health } from "./model.js";

export const calculateBMR = (gender, weight, height, age) => {
  const heightInCm = height;
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

export const predictWeightLoss = (
  currentWeight,
  goalWeight,
  calorieIntake,
  tdee
) => {
  // Calculate calorie deficit for each day
  const dailyCalorieDeficit = tdee - calorieIntake;

  // Calculate weight loss in kg for each day
  const kgPerDay = 7700 / dailyCalorieDeficit;

  // Round to 2 decimal places
  const roundedKgPerDay = Math.round(kgPerDay * 100) / 100;

  // Calculate days to reach goal weight
  const daysToGoalWeight = Math.ceil(
    (currentWeight - goalWeight) * roundedKgPerDay
  );

  return daysToGoalWeight;
};

export const calculateCalorieIntake = (
  gender,
  weight,
  weightUnit,
  height,
  heightUnit,
  age,
  activityLevel,
  healthGoals,
  weightGoal
) => {
  let weightInKg = weight;
  let heightInCm = height;

  if (weightUnit === "lbs") {
    weightInKg = weight * 0.453592;
  }

  if (heightUnit === "in") {
    heightInCm = height * 2.54;
  }

  const bmr = calculateBMR(gender, weightInKg, heightInCm, age);
  const tdee = calculateTDEE(bmr, activityLevel);
  let calorieIntake = Math.round(tdee);

  if (healthGoals.includes("weight_loss")) {
    calorieIntake = Math.round(tdee * 0.8);
  } else if (healthGoals.includes("maintain_weight")) {
    calorieIntake = Math.round(tdee);
  }

  // if (healthGoals.includes("improve_blood_sugar")) {
  //   calorieIntake = Math.round(calorieIntake * 0.9);
  // }

  // if (healthGoals.includes("lower_blood_pressure")) {
  //   calorieIntake = Math.round(calorieIntake * 0.9);
  // }

  // if (healthGoals.includes("lower_cholesterol")) {
  //   calorieIntake = Math.round(calorieIntake * 0.9);
  // }

  // if (healthGoals.includes("improve_digestion")) {
  //   calorieIntake = Math.round(calorieIntake * 1.1);
  // }

  // if (healthGoals.includes("increase_energy")) {
  //   calorieIntake = Math.round(calorieIntake * 1.1);
  // }

  const daysToGoalWeight = predictWeightLoss(
    weightInKg,
    weightGoal,
    calorieIntake,
    tdee
  );

  return {
    calorieIntake,
    daysToGoalWeight,
    tdee,
  };
};

export const calculateLimitSugarIntake = (diabetes) => {
  let sugarIntake;

  switch (diabetes) {
    case "diabetes":
    case "risk of diabetes":
      sugarIntake = 25;
      break;

    case "normal":
    default:
      sugarIntake = 50;
      break;
  }

  return sugarIntake;
};

export const matchNutrition = async (diabetesType) => {
  try {
    const nutrition = await Nutrition.findOne({ name: diabetesType });
    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition not found" });
    }

    return nutrition;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createHealth = async (req, res) => {
  try {
    const { userId } = req.params;
    const healthData = req.body;

    const sugarIntakeGram = calculateLimitSugarIntake(healthData.diabetes);
    const nutrition = await matchNutrition(healthData.diabetes);

    healthData.sugarIntakeGram = sugarIntakeGram;
    healthData.nutrition = nutrition;

    const user = await User.findById(userId).populate("health").exec();
    if (!user) {
      res.status(404).json("User not found");
    }

    if (!user.health) {
      const health = new Health({
        ...healthData,
      });
      const newHealth = await health.save();
      user.health = newHealth;
    } else {
      user.health.set(healthData);
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
