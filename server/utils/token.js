import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/keys.js";

export const generateToken = (user) => {
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
};

export const verifyToken = (token, cb) => {
  const decode = jwt.decode(token, jwt_secret);
  if (!decode) return cb(new Error("Token is not verified."));
  cb(null, decode);
};
