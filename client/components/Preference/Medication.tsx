import React, { ChangeEvent } from "react";
import Input, { INPUT_TYPE } from "../Input/Input";
import { useRecoilState } from "recoil";
import { preferenceState } from "../../recoils";

const Medication = () => {
  const [preference, setPreference] = useRecoilState(preferenceState);

  const handleMedicationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const medication = e.target.value;
    const isChecked = e.target.checked;

    setPreference((prevState) => {
      const medications = prevState.medications.slice();

      if (isChecked) {
        medications.push(medication);
      } else {
        const index = medications.indexOf(medication);
        if (index >= 0) {
          medications.splice(index, 1);
        }
      }

      return {
        ...prevState,
        medications,
      };
    });
  };

  return (
    <>
      <label>
        Medications:
        <br />
        <input
          type="checkbox"
          value="Metformin"
          checked={preference.medications.includes("Metformin")}
          onChange={handleMedicationChange}
        />
        <span>Metformin</span>
        <br />
        <input
          type="checkbox"
          value="Sulfonylureas"
          checked={preference.medications.includes("Sulfonylureas")}
          onChange={handleMedicationChange}
        />
        <span>Sulfonylureas</span>
        <br />
        <input
          type="checkbox"
          value="Meglitinides"
          checked={preference.medications.includes("Meglitinides")}
          onChange={handleMedicationChange}
        />
        <span>Meglitinides</span>
        <br />
        <input
          type="checkbox"
          value="GLP-1 receptor agonists"
          checked={preference.medications.includes("GLP-1 receptor agonists")}
          onChange={handleMedicationChange}
        />
        <span>GLP-1 receptor agonists</span>
        <br />
        <input
          type="checkbox"
          value="DPP-4 inhibitors"
          checked={preference.medications.includes("DPP-4 inhibitors")}
          onChange={handleMedicationChange}
        />
        <span>DPP-4 inhibitors</span>
        <br />
        <input
          type="checkbox"
          value="SGLT2 inhibitors"
          checked={preference.medications.includes("SGLT2 inhibitors")}
          onChange={handleMedicationChange}
        />
        <span>SGLT2 inhibitors</span>
        <br />
        <input
          type="checkbox"
          value="Thiazolidinediones"
          checked={preference.medications.includes("Thiazolidinediones")}
          onChange={handleMedicationChange}
        />
        <span>Thiazolidinediones</span>
      </label>
    </>
  );
};

export default Medication;
