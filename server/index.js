import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { port } from "./config/keys.js";
import routes from "./routes/index.js";
import { Configuration, OpenAIApi } from "openai";

import "./config/database.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   temperature: 0,
//   max_tokens: 7,
// });

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
app.post("/api/v1/meal-planner", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send(response.data.choices[0].text);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
