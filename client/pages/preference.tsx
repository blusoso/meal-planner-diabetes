import React from "react";

import { useRecoilValue } from "recoil";
import { preferenceState } from "../recoils";

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
import updateUser from "../services/users/updateUser";
import createHealth from "../services/health/createHealth";
import { CustomAppProps } from "./_app";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import Diabetes from "@/components/Preference/Diabetes";

type PreferenceProps = {} & CustomAppProps;

const Preference = ({ auth }: PreferenceProps) => {
  const router = useRouter();
  const preference = useRecoilValue(preferenceState);

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
      diabetes,
      healthGoals,
      weightGoal,
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
        healthGoals,
        weightGoal,
        isSetPreference: true,
      };

      const healthInfo = {
        bloodSugarLevel,
        medications,
        healthConditions,
        mealAmount,
        fasting,
        foodAllergies,
        diabetes,
        healthGoals,
      };

      const updatedUserRes = await updateUser(auth._id, userInfo);

      if (updatedUserRes.data) {
        const createdHealthRes = await createHealth(auth._id, healthInfo);
        if (createdHealthRes.data) {
          window.location.replace("/");
        }
      }
    }
  };

  return (
    <Layout auth={auth} protectedPage>
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
        <Diabetes />
        <br />
        <HealthGoal />
        <br />
        <button type="submit" onClick={onSubmitPreference}>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Preference;
