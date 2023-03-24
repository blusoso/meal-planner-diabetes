import { measurementList } from "../../utils/measurements.js";
import { mockMealPlanData } from "../../utils/mockMealPlanData.js";
import { prepList } from "../../utils/preps.js";
import { weekdays } from "../../utils/weekdays.js";
import { MealPlan } from "./model.js";

export const extractMealName = (text) => {
  const mealRegex = /Meal \d+: (.+)/g;
  const mealNames = [];

  let match;
  while ((match = mealRegex.exec(text))) {
    mealNames.push(match[1]);
  }

  return mealNames;
};

export const extractIngredient = (dayText, mealName) => {
  const ingredientsRegex = new RegExp(`${mealName}([\\s\\S]*?)Calories`, "i");
  const ingredientsMatch = dayText.match(ingredientsRegex);
  if (ingredientsMatch) {
    let ingredientText = ingredientsMatch[1].trim();
    ingredientText = ingredientText.replace(/^Ingredients:\s*/i, "");

    const lowercaseIngredientText = ingredientText.toLowerCase();
    const measurementRegex = `(${measurementList.join("|")})s?`;
    const prepRegex = `(${prepList.join("|")})`;

    //TODO: extract ", [prep]"

    const regex = new RegExp(
      `(?<amount>\\d+(?:\\.\\d+)?(?:\\/\\d+(?:\\.\\d+)?)?)\\s*(?<unit>${measurementRegex})?\\s*(?<prep>${prepRegex})?\\s*(?<ingredient>[\\w\\s]+)?\\s*(?<prep2>${prepRegex})?`,
      "gi"
    );

    let matches = lowercaseIngredientText.matchAll(regex);

    const ingredientList = [];

    for (const match of matches) {
      const amount = eval(match.groups.amount) || 0;
      const unit = match.groups.unit || null;
      const prep = match.groups.prep ?? match.groups.prep2 ?? null;
      const ingredient = match.groups.ingredient.trim() || null;

      ingredientList.push({ amount, unit, prep, ingredient });
    }

    // Extract "Salt and pepper to taste"
    const saltAndPepperRegex = /salt and pepper to taste/;
    if (saltAndPepperRegex.test(lowercaseIngredientText)) {
      ingredientList.push({
        amount: 0,
        unit: "pinch",
        prep: null,
        ingredient: "Salt and pepper to taste",
      });
    }

    return ingredientList;
  }
  return [];
};

export const extractCalories = (dayText, mealName) => {
  const caloriesRegex = new RegExp(
    `${mealName}[\\s\\S]*?Calories: ([0-9]+)`,
    "i"
  );
  const caloriesMatch = dayText.match(caloriesRegex);

  if (caloriesMatch) {
    const calories = parseInt(caloriesMatch[1]);

    return calories;
  }

  return 0;
};

export const extractNutrition = (mealData, mealName) => {
  const nutritionRegex =
    /Protein:\s*([\d\.]+)g\s*Fat:\s*([\d\.]+)g\s*Carbs:\s*([\d\.]+)g\s*Fiber:\s*([\d\.]+)g\s*Sodium:\s*([\d\.]+)mg\s*Sugar:\s*([\d\.]+)g/;
  const nutritionMatch = mealData.match(nutritionRegex);

  if (nutritionMatch) {
    return {
      protein: parseFloat(nutritionMatch[1]),
      fat: parseFloat(nutritionMatch[2]),
      carbs: parseFloat(nutritionMatch[3]),
      fiber: parseFloat(nutritionMatch[4]),
      sodium: parseFloat(nutritionMatch[5]),
      sugar: parseFloat(nutritionMatch[6]),
    };
  }

  return null;
};

export const extractCookingTime = (mealData, mealName) => {
  const regex = new RegExp(`${mealName}[\\s\\S]*?Cooking time: (\\d+)`);
  const match = mealData.match(regex);

  return match ? parseInt(match[1]) : null;
};

export const extractMealPlanData = (mealPlanData) => {
  let mealPlan = {};

  // Extract ingredients for each day of the week
  weekdays.forEach((day, dayIndex) => {
    if (mealPlanData.includes(day)) {
      const dayRegex = new RegExp(day + ":([^]*)");
      const dayMatch = mealPlanData.match(dayRegex);
      if (dayMatch) {
        mealPlan[`day${dayIndex + 1}`] = {};

        for (let i = 1; i <= 3; i++) {
          const mealNameRegex = new RegExp(`Meal ${i}: (.*)`);
          const mealNameMatch = dayMatch[0].match(mealNameRegex);
          if (mealNameMatch) {
            const mealName = mealNameMatch[1];
            mealPlan[`day${dayIndex + 1}`][`meal${i}`] = {
              name: mealName,
              ingredients: extractIngredient(dayMatch[0], mealName),
              calories: extractCalories(dayMatch[0], mealName),
              nutrition: extractNutrition(dayMatch[0], mealName),
              cookingTime: extractCookingTime(dayMatch[0], mealName),
            };
          }
        }
      }
    }
  });

  // Extract meal information for each day
  // const days = mealPlanData.split(/Day \d+:?/).slice(1);

  // days.forEach((day, index) => {
  //   const meals = day.split(/Meal \d:/).slice(1);
  //   mealPlan[`day${index + 1}`] = meals.map((meal) => {
  //     const [name, ingredients, ...details] = meal.split(/\n/).filter(Boolean);
  //     const [calories, nutritionInfo, budget, cookingTime] = details;
  //     return {
  //       name,
  //       ingredients,
  //       calories,
  //       nutritionInfo,
  //       budget,
  //       cookingTime,
  //     };
  //   });
  // });

  return mealPlan;
};

export const replaceDayNames = (text) => {
  const hasDayWord = text.includes("Day");

  if (hasDayWord) {
    return text.replace(/Day (\d+)/g, (match, dayNumber) => {
      const weekdayIndex = (parseInt(dayNumber) - 1) % 7;

      return `${weekdays[weekdayIndex]}:`;
    });
  }

  return text;
};

export const cleanText = (text) => {
  let cleanedText = text.replace(/\*\*/g, "");
  cleanedText = replaceDayNames(cleanedText);

  return cleanedText;
};

export const createMealPlan = async (req, res) => {
  try {
    // const mealPlanData = req.body;

    // const mealPlan = new MealPlan({
    //   ...mealPlanData,
    // });

    // const newMealPlan = await mealPlan.save();

    // res.status(201).json(newMealPlan);
    const text =
      "1 cup cooked quinoa, 1/2 cup cooked black beans, 1/2 cup cooked corn, 1/2 cup diced bell pepper, 1/4 cup diced red onion, 1/4 cup diced tomatoes, 1/4 cup diced cucumber, 2 tablespoons olive oil, 1 tablespoon lime juice, 1/4 teaspoon garlic powder, 1/4 teaspoon cumin, Salt and pepper to taste";

    const cleanedMealPlanData = cleanText(mockMealPlanData);
    res.status(200).json(extractMealPlanData(cleanedMealPlanData));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
