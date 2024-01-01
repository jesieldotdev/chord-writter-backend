import mongoose, { Schema } from "mongoose";

// Define the SheetProps interface
interface SheetProps {
  note: string;
  intervals: string[];
}

// Create the sheetSchema
const sheetSchema = new Schema<SheetProps>({
  note: String,
  intervals: [String],
});

// Define the VerseProps interface
interface MusicProps {
  name: string;
  sheets: {
    id: string;
    name: string;
    chords: SheetProps[];
  }[];
}

// Create the verseSchema
const musicSchema = new Schema<MusicProps>({
  name: String,
  sheets: [
    {
      id: String,
      name: String,
      chords: [sheetSchema],
    },
  ],
});

// Create the Sheets model
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
