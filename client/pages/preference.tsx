import React from "react";

import Age from "../components/Preference/Age";
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

const Preference = () => {
  return (
    <div>
      <form>
        <Age />
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
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default Preference;
