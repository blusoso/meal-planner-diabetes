import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const FoodAllergy = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const foodAllergyList = [
    { name: "Peanuts", label: "ถั่ว" },
    { name: "Shellfish", label: "หอย" },
    { name: "Fish", label: "ปลา" },
    { name: "Soy", label: "ถั่วเหลือง" },
    { name: "Wheat", label: "ข้าวสาลี" },
    { name: "Dairy", label: "ผลิตภัณฑ์นม" },
    { name: "Egg", label: "ไข่" },
  ];

  const handleFoodAllergyChange = (e) => {
    const allergy = e.target.value;
    const updatedAllergies = preference.foodAllergies.includes(allergy)
      ? preference.foodAllergies.filter((a) => a !== allergy)
      : [...preference.foodAllergies, allergy];
    setPreference({ ...preference, foodAllergies: updatedAllergies });
  };

  return (
    <>
      <label>
        แพ้ของกินอะไรบ้าง
        <br />
        {foodAllergyList.map((foodAllergy, index) => (
          <div key={`${foodAllergy.name}--${index}`}>
            <label>
              <input
                type="checkbox"
                value={foodAllergy.name}
                checked={preference.foodAllergies.includes(foodAllergy.name)}
                onChange={handleFoodAllergyChange}
              />
              {foodAllergy.label}
            </label>
            <br />
          </div>
        ))}
      </label>
    </>
  );
};

export default FoodAllergy;
