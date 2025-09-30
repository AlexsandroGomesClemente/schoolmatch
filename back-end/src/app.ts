import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/", router);

// Rota raiz
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Gymatch API running" });
});

export default app;
