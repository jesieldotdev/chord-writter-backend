import mongoose, { Schema } from "mongoose";

interface SheetProps {
  note: string;
  intervals: string[];
}

const sheetSchema = new Schema<SheetProps>({
  note: String,
  intervals: [String],
});
interface MusicProps {
  userId: string
  name: string;
  sheets: {
    id: string;
    name: string;
    chords: SheetProps[];
  }[];
}

const musicSchema = new Schema<MusicProps>({
  name: String,
  userId: String,
  sheets: [
    {
      id: String,
      name: String,
      chords: [sheetSchema],
    },
  ],
});

const Music = mongoose.model("Music", musicSchema);

// async function addData() {
//   try {
//     const verse = new Sheets({
//       name: "Music name",
//       sheets: [
//         {
//           id: "1",
//           name: "Verse 1",
//           chords: [{ note: "A", intervals: ["A", "B", "C"] }],
//         },
//       ],
//     });
//     await verse.save();
//     console.log("Data added successfully");
//   } catch (error) {
//     console.log(error);
//   }
// }

// addData();

export default Music;
