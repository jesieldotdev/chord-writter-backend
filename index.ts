import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import db from "./mongodb";
import Verse from "./chords.model";
import bodyParser from "body-parser";

dotenv.config();

async function data() {
  return await db();
}

data();

const app = express();
app.use(bodyParser.json());

app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT ?? 5000;

const getUsers = async () => {
  try {
    const users = await Verse.find({});
    //    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.post("/verse", async (req, res) => {
  const verse = new Verse(req.body);
  console.log(verse);
  try {
    await verse.save();
    res.status(201).send(verse);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/verse/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
  const result = await Verse.findByIdAndUpdate(id, updates, {new: true});
  res.status(200).send({message: 'Document updated', result});
  } catch (error) {
  res.status(400).send(error);
  }
 });
 

app.delete("/verse/:id", async (req, res) => {
  const id = req.params.id;
  try {
  const result = await Verse.findByIdAndDelete(id);
  res.status(200).send({message: 'Document removed', result});
  } catch (error) {
  res.status(400).send(error);
  }
 });

 app.get("/verse/:id", async (req, res) => {
  const id = req.params.id;
  try {
  const verse = await Verse.findById(id);
  if (!verse) {
  return res.status(404).send({ message: 'Verse not found' });
  }
  res.send(verse);
  } catch (error) {
  res.status(500).send(error);
  }
 });

server.listen(port, () => {
  console.log(`SERVER RUNING IN PORT ${port}`);
});
