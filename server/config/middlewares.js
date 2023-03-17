import { User } from "../routes/users/model.js";
import { verifyToken } from "../utils/token.js";

export const loginRequired = (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).json({ error: "Unauthorized" });

  // Validate jwt
  let try_token = req.header("Authorization").split(" ")[1];
  verifyToken(try_token, (err, payload) => {
    if (err) return res.status(401).send(err);
    const userId = payload.id;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        delete user.password;
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
      });
  });
};
