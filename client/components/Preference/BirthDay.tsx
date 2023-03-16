import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const BirthDay = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleBDChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setPreference({ ...preference, birthday: e.target.value });
  };

  return (
    <>
      <Input
        label="วันเกิด"
        name="birth_day"
        type={INPUT_TYPE.NUMBER}
        onChange={handleBDChange}
      />
    </>
  );
};

export default BirthDay;
