import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const BloodSugarLevel = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleBloodSugarLevelChange = (e: any) => {
    e.preventDefault();
    setPreference({ ...preference, bloodSugarLevel: parseInt(e.target.value) });
  };

  return (
    <>
      {/* <label>
        Blood Sugar Level:
        <br />
        <input
          type="range"
          min="70"
          max="300"
          step="1"
          value={preference.bloodSugarLevel}
          onChange={handleBloodSugarLevelChange}
        />
        <br />
        <span>70 mg/dL</span>
        <span style={{ float: "right" }}>300 mg/dL</span>
        <br />
        <span>{preference.bloodSugarLevel} mg/dL</span>
      </label> */}
      <label>
        ระดับน้ำตาลในเลือด Glycemic index
        <br />
        <input
          type="text"
          value={preference.bloodSugarLevel}
          onChange={handleBloodSugarLevelChange}
        />
        <span>mg/dL</span>
      </label>
    </>
  );
};

export default BloodSugarLevel;
