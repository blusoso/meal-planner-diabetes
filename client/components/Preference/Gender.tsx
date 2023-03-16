import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
}

const Gender = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleGenderChange = (e: any) => {
    e.preventDefault();
    setPreference({ ...preference, gender: e.target.value });
  };

  return (
    <>
      เพศ:
      <label>
        <input
          type="radio"
          name="gender"
          value={GENDER.MALE}
          checked={preference.gender === GENDER.MALE}
          onChange={handleGenderChange}
        />
        ผู้ชาย
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value={GENDER.FEMALE}
          checked={preference.gender === GENDER.FEMALE}
          onChange={handleGenderChange}
        />
        ผู้หญิง
      </label>
    </>
  );
};

export default Gender;
