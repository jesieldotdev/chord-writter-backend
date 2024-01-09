import Music from "../models/chords.model";


const getMusicsDb = async () => {
  try {
    const users = await Music.find({});
    //    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getMusics = async (req, res) => {
  const musics = await getMusicsDb();
  return res.send(musics);
}

export const createMusic = async (req, res) => {
  const music = new Music(req.body);
  console.log(music);
  try {
    await music.save();
    res.status(201).send(music);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const editMusic = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const result = await Music.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).send({ message: "Document updated", result });
  } catch (error) {
    res.status(400).send(error);
  }
}

export const deleteMusic = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Music.findByIdAndDelete(id);
    res.status(200).send({ message: "Document removed", result });
  } catch (error) {
    res.status(400).send(error);
  }
}

export const getMusicById = async (req, res) => {
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
}