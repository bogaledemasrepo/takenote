import { View, TextInput } from "react-native";
import NewnoteInput from "@components/NewnoteInput";
import React, { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { router } from "expo-router";
import { insertNote } from "@/utils/databases";
import { useAuth } from "@/hooks/authContext";

const Newnote = () => {
  const { user } = useAuth();
  console.log(user);
  const [isSavig, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handlePress = async () => {
    if (title.trim() === "") {
    }
    setSaving(true);
    await insertNote(title, body, JSON.parse(user)["USERNAME"]);
    setTitle("");
    setBody("");
    setSaving(false);
    router.replace("/(root)/(note)");
  };

  return (
    <>
      <Header title={"CREATE NEW NOTE"} />
      <View className="flex-1  p-4">
        <View className="h-[80%]">
          <View className="flex flex-col ring ring-slate-100 gap-1 my-2">
            <TextInput
              className="font-semibold text-lg p-3 rounded-sm pl border border-slate-400 text-slate-500"
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
