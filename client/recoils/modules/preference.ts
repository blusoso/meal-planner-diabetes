import { atom } from "recoil";
import { KEYS } from "../keys";

const preferenceState = atom({
  key: KEYS.PREFERENCE,
  default: {
    birthday: "",
    gender: "male",
    weight: 0,
    weightUnit: "kg",
    height: 0,
    heightUnit: "cm",
    activityLevel: "",
    bloodSugarLevel: 0,
    medications: [],
    healthConditions: [],
    mealAmount: 0,
    fasting: "",
    foodAllergies: [],
    healthGoals: [],
    weightGoal: 0,
    diabetes: "",
  },
});

export default preferenceState;
