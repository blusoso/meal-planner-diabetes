import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const MealAmount = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const mealAmountList = [
    { value: "1", label: "1 มื้อต่อวัน" },
    { value: "2", label: "2 มื้อต่อวัน" },
    { value: "3", label: "3 มื้อต่อวัน" },
    { value: "4", label: "4 มื้อต่อวัน" },
  ];

  const handleMealAmountChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPreference({ ...preference, mealAmount: e.target.value });
  };

  return (
    <>
      <label>
        ปกติคุณทานอาหารวันละกี่มื้อ?
        <br />
        {mealAmountList.map((mealAmount, index) => (
          <div key={`${mealAmount.value}--${index}`}>
            <label>
              <input
                name="meal-per-day"
                type="radio"
                value={mealAmount.value}
                checked={preference.mealAmount === mealAmount.value}
                onChange={handleMealAmountChange}
              />
              {mealAmount.label}
            </label>
            <br />
          </div>
        ))}
      </label>
    </>
  );
};

export default MealAmount;
