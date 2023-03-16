import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const Age = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleAgeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setPreference({ ...preference, age: e.target.value });
  };

  return (
    <>
      <Input
        label="อายุ"
        name="age"
        type={INPUT_TYPE.NUMBER}
        onChange={handleAgeChange}
      />
    </>
  );
};

export default Age;
