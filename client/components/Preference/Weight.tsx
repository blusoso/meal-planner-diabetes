import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const Weight = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleWeightChange = (e: any) => {
    e.preventDefault();
    setPreference({ ...preference, weight: e.target.value });
  };

  return (
    <>
      <Input
        label="น้ำหนัก (กิโลกรัม)"
        name="weight"
        type={INPUT_TYPE.NUMBER}
        onChange={handleWeightChange}
      />
    </>
  );
};

export default Weight;
