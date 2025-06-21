import { getAllNotes, insertNote, NOTESTYPE,setNoteAtDb } from "@/utils/databases";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

function delayMe() {
  setTimeout(() => {
    return ''
  }, 300);
}
const initial: NOTESTYPE[] = [];
const NoteContext = createContext({
  notes: initial,
  addNote: (title: string, body: string, username: string) => {},
  deleteNote: (id: string) => {},
  updateNote: async (id: string, title: string, body: string): Promise<string> => {
    delayMe();
    return '';
    
  },
});
const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NOTESTYPE[]>(initial);
  const addNote = async (title: string, body: string, username: string) => {
    await insertNote(title, body, username);
    const { data } = await getAllNotes();
    setNotes(data);
  };

  const deleteNote = async (id: string) => {
    await deleteNote(id);
    const { data } = await getAllNotes();
    setNotes(data);
  };
  const updateNote = async (id: string, title: string, body: string) => {
    const res = await setNoteAtDb(id,title,body);
    if(res.status=='success') {
      const { data } = await getAllNotes();
      setNotes(data);
    }
    return '1';
  };
  useEffect(() => {
    async function getNots() {
      const { data } = await getAllNotes();
      setNotes(data);
    }
    getNots();
  }, [notes]);
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;

export const useNotes = () => useContext(NoteContext);
