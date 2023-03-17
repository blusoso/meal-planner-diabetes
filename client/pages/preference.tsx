import React, { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { authState, preferenceState } from "../recoils";

import Gender from "../components/Preference/Gender";
import Weight from "../components/Preference/Weight";
import Height from "../components/Preference/Height";
import ActivityLevel from "../components/Preference/ActivityLevel";
import BloodSugarLevel from "../components/Preference/BloodSugarLevel";
import Medication from "../components/Preference/Medication";
import HealthCondition from "../components/Preference/HealthCondition";
import MealAmount from "../components/Preference/MealAmount";
import IF from "../components/Preference/IF";
import FoodAllergy from "../components/Preference/FoodAllergy";
import HealthGoal from "../components/Preference/HealthGoal";
import BirthDay from "../components/Preference/BirthDay";
import jwtDecode from "jwt-decode";
import updateUser from "../services/users/updateUser";
import createHealth from "../services/health/createHealth";

const Preference = () => {
  const preference = useRecoilValue(preferenceState);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decoded: any = jwtDecode(token || "");
    setAuth(decoded);
  }, []);

  console.log(auth);
  const onSubmitPreference = async (e: any) => {
    e.preventDefault();

    const {
      birthday,
      gender,
      weight,
      weightUnit,
      height,
      heightUnit,
      activityLevel,
      bloodSugarLevel,
      medications,
      healthConditions,
      mealAmount,
      fasting,
      foodAllergies,
      healthGoals,
    } = preference;

    if (auth) {
      const userInfo = {
        birthday,
        gender,
        weight,
        weightUnit,
        height,
        heightUnit,
        activityLevel,
        isSetPreference: true,
      };

      const healthInfo = {
        bloodSugarLevel,
        medications,
        healthConditions,
        mealAmount,
        fasting,
        foodAllergies,
        healthGoals,
      };

      const updatedUserRes = await updateUser(auth.id, userInfo);

      if (updatedUserRes.data) {
        const createdHealthRes = await createHealth(auth.id, healthInfo);
        console.log("createdHealthRes", createdHealthRes);
      }
    }
  };

  return (
    <div>
      <form>
        <BirthDay />
        <br />
        <Gender />
        <br />
        <Weight />
        <br />
        <Height />
        <br />
        <ActivityLevel />
        <br />
        <BloodSugarLevel />
        {/* <Medication /> */}
        {/* <br /> */}
        <HealthCondition />
        <br />
        <MealAmount />
        <br />
        <IF />
        <br />
        <FoodAllergy />
        <br />
        <HealthGoal />
        <br />
        <button type="submit" onClick={onSubmitPreference}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Preference;
