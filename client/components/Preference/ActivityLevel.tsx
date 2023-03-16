import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const ActivityLevel = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const activityLevelList = [
    { name: "sedentary", label: "ไม่ออกกำลังกายเลยหรือออกนิดเดียว" },
    { name: "lightlyActive", label: "ออกกำลังกาย 1-3 วันต่อสัปดาห์" },
    { name: "moderatelyActive", label: "ออกกำลังกาย 3-5 วันต่อสัปดาห์" },
    { name: "veryActive", label: "ออกกำลังกาย 5-7 วันต่อสัปดาห์" },
    {
      name: "superActive",
      label: "ออกกำลังกายอย่างหนัก หรือออกกำลังกาย 2 ครั้งต่อวัน",
    },
  ];

  const handleActivityLevelChange = (e: any) => {
    e.preventDefault();
    setPreference({ ...preference, activityLevel: e.target.value });
  };

  return (
    <>
      <label>
        ออกกำลังกายบ่อยแค่ไหน
        <br />
        {activityLevelList.map((activityLevel, index) => (
          <div key={`${activityLevel.name}--${index}`}>
            <label>
              <input
                type="radio"
                value={activityLevel.name}
                checked={preference.activityLevel === activityLevel.name}
                onChange={handleActivityLevelChange}
              />
              {activityLevel.label}
            </label>
            <br />
          </div>
        ))}
      </label>
    </>
  );
};

export default ActivityLevel;
