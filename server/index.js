import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { port } from "./config/keys.js";
import routes from "./routes/index.js";

import "./config/database.js";

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors({ credentials: true }));

// Passport middleware
// app.use(passport.initialize());

// Passport config
// require("./config/passport")(passport);

// Routes
app.use("/api/v1", routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
