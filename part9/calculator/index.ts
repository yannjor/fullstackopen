import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const params = req.query;
  const height = Number(params.height);
  const weight = Number(params.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformed parameters" });
    return;
  }
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }
  try {
    const exerciseHours = daily_exercises as number[];
    const targetNumber = Number(target);
    const result = calculateExercises(exerciseHours, targetNumber);
    res.json(result);
  } catch {
    res.status(400).send({ error: "malformed parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
