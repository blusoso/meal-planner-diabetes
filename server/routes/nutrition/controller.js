import { Nutrition } from "./model.js";

export const createNutrition = async (req, res) => {
  try {
    const nutritionData = req.body;

    const nutrition = new Nutrition({
      ...nutritionData,
    });

    const newNutrition = await nutrition.save();

    res.status(201).json(newNutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
