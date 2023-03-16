import { atom } from "recoil";
import { KEYS } from "../keys";

const preferenceState = atom({
  key: KEYS.PREFERENCE,
  default: {
    birthday: "",
    gender: "male",
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    activityLevel: "",
    bloodSugarLevel: 0,
    medications: [],
    healthConditions: [],
    mealAmount: "",
    fasting: "",
    foodAllergies: [],
    healthGoals: [],
  },
});

export default preferenceState;
