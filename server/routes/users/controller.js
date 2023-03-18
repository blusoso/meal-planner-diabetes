import bcrypt from "bcryptjs";
import { User } from "./model.js";
import { calculateCalorieIntake } from "../health/controller.js";

export const calculateAge = (birthday) => {
  const today = new Date();
  const birthDate = new Date(birthday);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .populate("health")
    .then((user) => {
      if (!user) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json(user);
      }
    });
};

export const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Hash password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    });
  });
};

export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { birthday, ...updates } = req.body;
  const options = { new: true };

  const age = calculateAge(birthday);

  const { calorieIntake, daysToGoalWeight, tdee } = calculateCalorieIntake(
    updates.gender,
    updates.weight,
    updates.weightUnit,
    updates.height,
    updates.heightUnit,
    age,
    updates.activityLevel,
    updates.healthGoals,
    updates.weightGoal
  );

  updates.calorieIntake = calorieIntake;
  // updates.daysToGoalWeight = daysToGoalWeight;
  // updates.tdee = tdee;

  User.findByIdAndUpdate(userId, updates, options)
    .then((user) => {
      if (!user) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
