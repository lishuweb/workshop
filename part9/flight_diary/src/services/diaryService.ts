import diaryData from "../../data/entries";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData;

const getEntries = () => {
    return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id, 
        date,
        weather,
        visibility,
    }));
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find((d) => d.id === id);
    return entry;
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
    const NewDiaryEntry = {
        id: Math.max(...diaries.map((d) => d.id)) + 1,
        ...entry,
    };
    diaries.push(NewDiaryEntry);
    return NewDiaryEntry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};