import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const Height = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleHeightChange = (e: any) => {
    e.preventDefault();
    setPreference({ ...preference, height: e.target.value });
  };

  return (
    <>
      <Input
        label="ส่วนสูง (เซนติเมตร)"
        name="height"
        type={INPUT_TYPE.NUMBER}
        onChange={handleHeightChange}
      />
    </>
  );
};

export default Height;
