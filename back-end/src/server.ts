import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);
app.get("/", (req, res) =>
  res.json({ ok: true, message: "Gymatch API running" })
);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
