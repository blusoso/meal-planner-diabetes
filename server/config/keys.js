import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/mern";
export const jwt_secret = process.env.JWT_SECRET || "unsafe_jwt_secret";
