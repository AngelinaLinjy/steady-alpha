import express from "express";
import cors from "cors";
import { askQuestion } from "./bot.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  const answer = await askQuestion(question);
  res.json({ answer });
});

app.listen(3000, () => {
  console.log("AI Bot running at http://localhost:3000");
});
