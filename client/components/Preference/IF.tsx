import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const IF = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const ifList = [
    { name: "no_fasting", label: "ไม่ได้ fasting" },
    { name: "16_8", label: "16/8 (อด 16 ชั่วโมง, กิน 8 ชั่วโมง)" },
    { name: "18_6", label: "18/6 (อด 18 ชั่วโมง, กิน 6 ชั่วโมง)" },
    { name: "20_4", label: "20/4 (อด 20 ชั่วโมง, กิน 4 ชั่วโมง)" },
    { name: "23_1", label: "23/1 (อด 23 ชั่วโมง, กิน 1 ชั่วโมง)" },
  ];

  const handleIFChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreference({ ...preference, fasting: e.target.value });
  };

  return (
    <>
      <label>
        Intermittent Fasting:
        <br />
        {ifList.map((fasting, index) => (
          <div key={`${fasting.name}--${index}`}>
            <label>
              <input
                type="radio"
                name="if"
                value={fasting.name}
                checked={preference.fasting === fasting.name}
                onChange={handleIFChange}
              />
              {fasting.label}
            </label>
            <br />
          </div>
        ))}
      </label>
    </>
  );
};

export default IF;
