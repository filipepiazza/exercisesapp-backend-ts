import express from "express";
import { calculator, Operation } from "./calculator";
import { calculateBmi } from "./bmicalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("hello fullstack !");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (_req, res) => {
  console.log(_req.query);
  const { height, weight } = _req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight));
    const response = {
      height,
      weight,
      result,
    };
    res.send(response);
  } else {
    res.send({ error: "malformatted params" });
  }
});

app.post("/exercises", (_req, res) => {
  console.log(_req.body);

  const { daily_exercises, target } = _req.body;

  if (!daily_exercises || !target) {
    res.send({ error: "missing params" });
  } else if (Array.isArray(daily_exercises) && !isNaN(Number(target))) {
    try {
      daily_exercises.map((de) => Number(de));
    } catch (error) {
      res.send({ error: "malformatted params 1" });
    }
    const result = calculateExercises(daily_exercises, Number(target));

    res.send(result);
  } else {
    res.send({ error: "malformatted params 2" });
  }
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    res.status(400).send({ error: "..." });
  }

  //const operation = op as Operation;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
