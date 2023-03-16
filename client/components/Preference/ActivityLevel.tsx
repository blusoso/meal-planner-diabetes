import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

export const enum ACTIVITY_LEVEL {
  SEDENTARY = "sedentary",
  LIGHTLY_ACTIVE = "lightly active",
  MODERATELY_ACTIVE = "moderately active",
  VERY_ACTIVE = "very active",
  SUPER_ACTIVE = "super active",
}

const ActivityLevel = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const activityLevelList = [
    {
      name: ACTIVITY_LEVEL.SEDENTARY,
      label: "ไม่ออกกำลังกายเลยหรือออกนิดเดียว",
    },
    {
      name: ACTIVITY_LEVEL.LIGHTLY_ACTIVE,
      label: "ออกกำลังกาย 1-3 วันต่อสัปดาห์",
    },
    {
      name: ACTIVITY_LEVEL.MODERATELY_ACTIVE,
      label: "ออกกำลังกาย 3-5 วันต่อสัปดาห์",
    },
    {
      name: ACTIVITY_LEVEL.VERY_ACTIVE,
      label: "ออกกำลังกาย 5-7 วันต่อสัปดาห์",
    },
    {
      name: ACTIVITY_LEVEL.SUPER_ACTIVE,
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
