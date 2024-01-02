import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import db from "./mongodb";
import bodyParser from "body-parser";
import Music from "./chords.model";

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

const port = process.env.PORT ?? 5000;

const getMusics = async () => {
  try {
    const users = await Music.find({});
    //    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  const musics = await getMusics();
  res.send(musics);
});

app.post("/music", async (req, res) => {
  const music = new Music(req.body);
  console.log(music);
  try {
    await music.save();
    res.status(201).send(music);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/music/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const result = await Music.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).send({ message: "Document updated", result });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/music/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Music.findByIdAndDelete(id);
    res.status(200).send({ message: "Document removed", result });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/music/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).send({ message: "Verse not found" });
    }
    res.send(music);
  } catch (error) {
    res.status(500).send(error);
  }
});

server.listen(port, () => {
  console.log(`SERVER RUNING IN PORT ${port}`);
});
