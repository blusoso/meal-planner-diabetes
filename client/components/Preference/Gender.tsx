import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

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
          value="m"
          checked={preference.gender === "m"}
          onChange={handleGenderChange}
        />
        ผู้ชาย
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="f"
          checked={preference.gender === "f"}
          onChange={handleGenderChange}
        />
        ผู้หญิง
      </label>
    </>
  );
};

export default Gender;
