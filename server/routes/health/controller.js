import { User } from "../users/model.js";
import { Health } from "./model.js";

export const createHealth = async (req, res) => {
  try {
    const { userId } = req.params;
    const healthData = req.body;

    const health = new Health({
      ...healthData,
    });

    const newHealth = await health.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { health: newHealth._id },
      { new: true }
    ).exec();

    if (!user) {
      res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
