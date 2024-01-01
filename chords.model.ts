import mongoose from 'mongoose'

import { Schema } from 'mongoose';

// Interface SheetProps
interface SheetProps {
 note: string;
 intervals: string[];
}

const sheetSchema = new Schema<SheetProps>({
 note: String,
 intervals: [String],
});

// Interface VerseProps
interface VerseProps {
 id: string;
 name: string;
 chords: SheetProps[];
}

const verseSchema = new Schema<VerseProps>({
 id: String,
 name: String,
 chords: [sheetSchema],
});

// Interface NewTitle
interface NewTitle {
 id: string;
 newName: string;
}

const titleSchema = new Schema<NewTitle>({
 id: String,
 newName: String,
});


const Verse = mongoose.model('Verse', verseSchema)

// async function addData() {
//     try {
//      const verse = new Verse({
//        id: '1',
//        name: 'Verse 1',
//        chords: [{ note: 'A', intervals: ['A', 'B', 'C'] }],
//      });
//      await verse.save();
//      console.log('Data added successfully');
//     } catch (error) {
//      console.log(error);
//     }
//    }
   
//    addData();

export default Verse