import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jwt_secret } from "../../config/keys.js";

import { User } from "../users/model.js";
import { createUser } from "../users/controller.js";

import { validateRegisterInput, validateLoginInput } from "./validation.js";
import { generateToken } from "../../utils/token.js";

export const register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      createUser(req, res);
    }
  });
};

export const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          jwt_secret,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
        // generateToken(user);
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

export const getMe = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // verify the token
  const decoded = jwt.verify(token, jwt_secret);
  const userId = decoded.id;

  User.findById(userId)
    .populate("health")
    .select("-password")
    .then((user) => {
      if (!user) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json(user);
      }
    });
};
