import { createContext, ReactNode, useContext, useState } from "react";
interface newNoteType {
  id: string;
  title: string;
  body: string;
}

const initial: newNoteType[] = [];
const NoteContext = createContext({
  notes: initial,
  addNote: (state: newNoteType) => {},
  deleteNote: (id: string) => {},
  searchNotes: (text: string) => {},
});
const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState(initial);
  const addNote = (newNote: newNoteType) => {
    setNotes((state) => {
      return [...state, newNote];
    });
  };

  const deleteNote = (id: string) => {
    setNotes((state) => {
      const newState = state.filter((Item) => Item.id === id);
      return [...newState];
    });
  };
  const searchNotes = (text: string) => {
    return notes.filter((Item) => Item.title.includes(text));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, searchNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;

export const useNotes = () => useContext(NoteContext);
