import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const Diabetes = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const diabetesList = [
    { name: "diabetes", label: "เป็น" },
    { name: "risk of diabetes", label: "มีความเสี่ยง" },
    { name: "normal", label: "ไม่เป็น" },
  ];

  const handleDiabetesChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPreference({ ...preference, diabetes: e.target.value });
  };

  return (
    <>
      <label>
        เป็นเบาหวานมั้ย
        <br />
        {diabetesList.map((diabetes, index) => (
          <div key={`${diabetes}--${index}`}>
            <input
              type="radio"
              name="diabetes"
              value={diabetes.name}
              checked={preference.diabetes.includes(diabetes.name)}
              onChange={handleDiabetesChange}
            />
            <span>{diabetes.label}</span>
            <br />
          </div>
        ))}
      </label>
    </>
  );
};

export default Diabetes;
