import { View, TextInput } from "react-native";
import NewnoteInput from "@/components/NewnoteInput";
import React, { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { router, useRouter } from "expo-router";
import { insertNote, updateNotes } from "@/utils/databases";
import { useAuth } from "@/hooks/authContext";
interface NoteType {
  noteId: number;
  noteTitle: string;
  noteBody: string;
}
const Newnote = ({ noteId, noteTitle, noteBody }: NoteType) => {
  const r = useRouter();
  const { user } = useAuth();
  const [isSavig, setSaving] = useState(false);
  const [title, setTitle] = useState(noteId ? noteTitle : "");
  const [body, setBody] = useState(noteId ? noteBody : "");
  const handlePress = async () => {
    if (title.trim() === "") {
    }
    setSaving(true);
    if (noteId) {
      await updateNotes(noteId, title, body);
    } else await insertNote(title, body, JSON.parse(user)["USERNAME"]);
    setTitle("");
    setBody("");
    setSaving(false);
    router.replace("/(root)/(note)");
  };

  return (
    <>
      <Header title={noteId ? `UPDATE ${noteTitle}` : "CREATE NEW NOTE"} />
      <View className="flex-1  p-4">
        <View className="h-[80%]">
          <View className="flex flex-col ring ring-slate-100 gap-1 my-2">
            <TextInput
              className=" font-semibold text-lg p-3 rounded-sm pl border border-slate-400 text-slate-500"
              placeholder="Note title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View className="flex-1 flex flex-col ring ring-slate-100 gap-1 my-1">
            <View style={{ flex: 1 }}>
              <NewnoteInput
                value={body}
                onChangeText={(text: string) => setBody(text)}
              />
            </View>
          </View>
        </View>
        <Button
          disabled={title.trim() === ""}
          title="Save"
          saving={isSavig}
          pressHandler={handlePress}
        />
      </View>
    </>
  );
};

export default Newnote;
