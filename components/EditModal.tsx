import { View, Text, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import Header from "./Header";
import NewnoteInput from "./NewnoteInput";
import Button from "./Button";
import { useAuth } from "@/hooks/authContext";
import { router } from "expo-router";

const EditModal = ({ title, body }: { title: string; body: string }) => {
  const { user } = useAuth();
  const [isSavig, setSaving] = useState(false);
  const [ntitle, setTitle] = useState(title);
  const [nbody, setBody] = useState(body);
  const handlePress = async () => {
    if (title.trim() === "") {
    }
    setSaving(true);
    setTitle("");
    setBody("");
    setSaving(false);
    router.replace("/(root)/(note)");
  };
  return (
    <Modal visible={false} transparent>
      <>
        <Header title="CREATE NEW NOTE" />
        <View className="flex-1  p-4">
          <View className="h-[80%]">
            <View className="flex flex-col ring ring-slate-100 gap-1 my-2">
              <TextInput
                className=" font-semibold text-lg p-3 rounded-sm pl border border-slate-400 text-slate-500"
                placeholder="Note title"
                value={ntitle}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View className="flex-1 flex flex-col ring ring-slate-100 gap-1 my-1">
              <View style={{ flex: 1 }}>
                <NewnoteInput
                  value={nbody}
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
    </Modal>
  );
};

export default EditModal;
