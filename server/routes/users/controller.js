import bcrypt from "bcryptjs";
import { User } from "../users/model.js";

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
  const updates = req.body;
  const options = { new: true };

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
