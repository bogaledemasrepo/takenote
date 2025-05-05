import { View, TextInput, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import BackBtn from "@/components/BackBtn";
import NewnoteInput from "@/components/NewnoteInput";
import Button from "@/components/Button";
import { useNotes } from "@/hooks/notesContext";

const NoteDetailUpdate = () => {
  const { notes, updateNote } = useNotes();
  const { noteDetail } = useLocalSearchParams();
  const [isSavig, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handlePress = async () => {
    setSaving(true);
    await updateNote(noteDetail[2], title, body);
    setSaving(false);
  };

  useEffect(() => {
    const note = notes.filter((Item) => Item.ID === noteDetail[2])[0];
    setTitle(note.TITLE);
    setBody(note.BODY);
    return;
  }, []);
  return (
    <>
      <Header
        headerLeft={<BackBtn />}
        title={`UPDATE NOTE`}
        headerRight={<Text> </Text>}
      />
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
                onChangeText={(text) => {
                  setBody(text);
                }}
              />
            </View>
          </View>
        </View>
        <Button
          disabled={title.trim() === ""}
          title="Update"
          saving={isSavig}
          pressHandler={handlePress}
        />
      </View>
    </>
  );
};

export default NoteDetailUpdate;
