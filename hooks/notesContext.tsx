import { getAllNotes, getNote, NOTESTYPE } from "@/utils/databases";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface newNoteType {
  id: string;
  title: string;
  body: string;
}

const initial: NOTESTYPE[] = [];
const NoteContext = createContext({
  notes: initial,
  addNote: (state: NOTESTYPE) => {},
  deleteNote: (id: number) => {},
  searchNotes: (text: string) => {},
});
const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NOTESTYPE[]>(initial);
  const addNote = (newNote: NOTESTYPE) => {
    setNotes((state) => {
      return [...state, newNote];
    });
  };

  const deleteNote = (id: number) => {
    setNotes((state) => {
      const newState = state.filter((Item) => Item.ID === id);
      return [...newState];
    });
  };
  const searchNotes = (text: string) => {
    return notes.filter((Item) => Item.TITLE.includes(text));
  };
  useEffect(() => {
    async function getNots() {
      const { data } = await getAllNotes();
      setNotes(data);
    }
    getNots();
  }, [notes]);
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, searchNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;

export const useNotes = () => useContext(NoteContext);
