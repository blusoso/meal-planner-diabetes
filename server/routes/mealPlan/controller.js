import { measurementList } from "../../utils/measurements.js";
import { mergedWithComma } from "../../utils/mergeArray.js";
import { mockMealPlanData } from "../../utils/mockMealPlanData.js";
import { prepList } from "../../utils/preps.js";
import { weekdays } from "../../utils/weekdays.js";
import { MealPlan } from "./model.js";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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

// export const extractMealPlanData = (mealPlanData) => {
//   let mealPlan = {};

//   // Extract ingredients for each day of the week
//   weekdays.forEach((day, dayIndex) => {
//     if (mealPlanData.includes(day)) {
//       const dayRegex = new RegExp(day + ":([^]*)");
//       const dayMatch = mealPlanData.match(dayRegex);
//       if (dayMatch) {
//         mealPlan[`day${dayIndex + 1}`] = {};

//         for (let i = 1; i <= 3; i++) {
//           const mealNameRegex = new RegExp(`Meal ${i}: (.*)`);
//           const mealNameMatch = dayMatch[0].match(mealNameRegex);
//           if (mealNameMatch) {
//             const mealName = mealNameMatch[1];
//             mealPlan[`day${dayIndex + 1}`][`meal${i}`] = {
//               name: mealName,
//               ingredients: extractIngredient(dayMatch[0], mealName),
//               calories: extractCalories(dayMatch[0], mealName),
//               nutrition: extractNutrition(dayMatch[0], mealName),
//               cookingTime: extractCookingTime(dayMatch[0], mealName),
//             };
//           }
//         }
//       }
//     }
//   });

export const matchMeal = (dayMatch, mealRegex, mealWord) => {
  const mealMatched = dayMatch[1].match(mealRegex);

  if (mealMatched) {
    return mealMatched[0].replace(`${mealWord}: `, "");
  }

  return null;
};

export const extractMealPlanData = (mealPlanData) => {
  let mealPlan = {};

  const breakfastRegex = /Breakfast: ([^\n]*)/g;
  const lunchRegex = /Lunch: ([^\n]*)/g;
  const dinnerRegex = /Dinner: ([^\n]*)/g;

  // Extract ingredients for each day of the week
  weekdays.forEach((day, dayIndex) => {
    if (mealPlanData.includes(day)) {
      const dayRegex = new RegExp(day + ":([^]*)");
      const dayMatch = mealPlanData.match(dayRegex);

      if (dayMatch) {
        let dayArr = (mealPlan[`day${dayIndex + 1}`] = []);

        const meal1 = matchMeal(dayMatch, breakfastRegex, "Breakfast");
        const meal2 = matchMeal(dayMatch, lunchRegex, "Lunch");
        const meal3 = matchMeal(dayMatch, dinnerRegex, "Dinner");

        if (meal1) dayArr.push(meal1);
        if (meal2) dayArr.push(meal2);
        if (meal3) dayArr.push(meal3);
      }
    }
  });

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

  // Day 1, ... , Day 7 case
  cleanedText = replaceDayNames(cleanedText);

  // remove words in meal
  cleanedText = cleanedText.replace("Thai", "");

  return cleanedText;
};

export const createChatCompletion = async (req, res) => {
  const {
    diabetes,
    healthConditions,
    healthGoals,
    calorieIntake,
    mealAmount,
    foodAllergies,
  } = req.body;

  const diabetesText =
    diabetes === "diabetes" || diabetes === "risk of diabetes"
      ? "type 2 diabetes with"
      : "";

  const mergedHealthConditions = mergedWithComma(healthConditions);
  const mergedHealthGoals = mergedWithComma(healthGoals);
  const mergedFoodAllergies = mergedWithComma(foodAllergies);

  const foodAllergiesText = mergedFoodAllergies
    ? `allergic to ${mergedFoodAllergies}`
    : "";

  try {
    const prompt = `Suggest personalized weekly meal plan for
    ${diabetesText} ${mergedHealthConditions}
    who wants to ${mergedHealthGoals} within ${calorieIntake} calories intake per day, 
    ${mealAmount} meals per day and prefers of vegan, gluten-free. 
    ${foodAllergiesText}. 
    budget of 1000 baht per week, 
    needs meals that can be prepared in under 30 minutes. 
    ingredients available and easy to find in Thailand. 
    give meal names in each day`;

    const options = {
      temperature: 0.2,
      max_tokens: 400,
    };

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      ...options,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createMealName = async ({ mealName, lang }) => {
  MealPlan.findOne({ name: mealName }).then(async (meal) => {
    if (!meal) {
      const newMealPlan = new MealPlan({ name: mealName, lang });
      await newMealPlan.save();
    }
  });
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

    // const response = createChatCompletion(req, res);
    const cleanedMealPlanData = cleanText(mockMealPlanData);
    const mealPlanJSON = extractMealPlanData(cleanedMealPlanData);

    for (const day in mealPlanJSON) {
      const mealListEachDay = mealPlanJSON[day];

      mealListEachDay.map(async (mealName) => {
        await createMealName({ mealName, lang: "en" });
      });
    }

    res.status(200).json(mealPlanJSON);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const regenerateMealName = async (req, res) => {
  const { mealName, foodAllergies } = req.body;

  const mergedFoodAllergies = mergedWithComma(foodAllergies);
  const foodAllergiesText = mergedFoodAllergies
    ? `allergic to ${mergedFoodAllergies}`
    : "";

  try {
    const prompt = `Suggest a meal name that calories equal to 
    ${mealName}. prefers of vegan, gluten-free. ${foodAllergiesText}.
    ingredients available and easy to find in Thailand`;

    const options = {
      temperature: 0.7,
      max_tokens: 100,
    };

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      ...options,
    });

    res.status(200).send(response.data.choices[0].text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
