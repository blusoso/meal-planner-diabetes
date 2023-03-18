import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const HealthGoal = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const healthGoalsOptions = [
    { label: "Weight loss", value: "weight_loss" },
    { label: "Maintain weight", value: "maintain_weight" },
    { label: "Improve blood sugar levels", value: "improve_blood_sugar" },
    { label: "Lower blood pressure", value: "lower_blood_pressure" },
    { label: "Lower cholesterol", value: "lower_cholesterol" },
    { label: "Improve digestion", value: "improve_digestion" },
    { label: "Increase energy", value: "increase_energy" },
  ];

  const handleHealthGoalsChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setPreference({
        ...preference,
        healthGoals: [...preference.healthGoals, value],
      });
    } else {
      setPreference({
        ...preference,
        healthGoals: preference.healthGoals.filter((goal) => goal !== value),
      });
    }
  };

  const handleWeightGoalChange = (e) => {
    e.preventDefault();
    setPreference({ ...preference, weightGoal: parseFloat(e.target.value) });
  };

  return (
    <>
      <label>Health Goals:</label>
      {healthGoalsOptions.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            name="healthGoals"
            value={option.value}
            checked={preference.healthGoals.includes(option.value)}
            onChange={handleHealthGoalsChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}

      {preference.healthGoals.includes("weight_loss") && (
        <Input
          label="น้ำหนักที่ต้องการ (กิโลกรัม)"
          name="weight"
          type={INPUT_TYPE.NUMBER}
          onChange={handleWeightGoalChange}
        />
      )}
    </>
  );
};

export default HealthGoal;
