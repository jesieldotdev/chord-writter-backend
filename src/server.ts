import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import db from "../config/mongodb";
import bodyParser from "body-parser";
import { createMusic, deleteMusic, editMusic, getMusicById, getMusics } from "./controllers/controllers";

dotenv.config();

async function data() {
  return await db();
}

data();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
});

const server = http.createServer(app);

const port = process.env.PORT ?? 4001;

app.get("/", getMusics);

app.post("/music", createMusic);

app.patch("/music/:id", editMusic);

app.delete("/music/:id", deleteMusic);

app.get("/music/:id", getMusicById);

server.listen(port, () => {
  console.log(`SERVER RUNING IN PORT ${port}`);
});
