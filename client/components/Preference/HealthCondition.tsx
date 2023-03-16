import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const HealthCondition = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const healthConditionList = [
    { name: "High blood pressure", label: "ความดันสูง" },
    { name: "High cholesterol", label: "คอเลสเตอรอลสูง" },
    { name: "Cardiovascular disease", label: "โรคหลออดเลือดและหัวใจ" },
    { name: "Kidney disease", label: "โรคไต" },
    { name: "Nerve damage", label: "เส้นประสาทเสียหาย" },
    { name: "Eye damage", label: "ดวงตาเสียหาย" },
  ];

  const handleHealthConditionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const healthCondition = e.target.value;
    const isChecked = e.target.checked;

    setPreference((prevState) => {
      const healthConditions = prevState.healthConditions.slice();

      if (isChecked) {
        healthConditions.push(healthCondition);
      } else {
        const index = healthConditions.indexOf(healthCondition);
        if (index >= 0) {
          healthConditions.splice(index, 1);
        }
      }

      return {
        ...prevState,
        healthConditions,
      };
    });
  };

  return (
    <>
      <label>
        Health Conditions:
        <br />
        {healthConditionList.map((healthCondition, index) => (
          <div key={`${healthCondition}--${index}`}>
            <input
              type="checkbox"
              value={healthCondition.name}
              checked={preference.healthConditions.includes(
                healthCondition.name
              )}
              onChange={handleHealthConditionChange}
            />
            <span>{healthCondition.label}</span>
            <br />
          </div>
        ))}
      </label>
    </>
  );
};

export default HealthCondition;
