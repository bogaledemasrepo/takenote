import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import {
  addToFavorite,
  delateNote,
  getNote,
  NOTESTYPE,
  removeFromFavorite,
} from "@/utils/databases";
import BackBtn from "@/components/BackBtn";
import { MaterialIcons } from "@expo/vector-icons";
import Line from "@/components/Line";
import EditModal from "@/components/EditModal";

const NoteId = () => {
  const [note, setNote] = useState<NOTESTYPE>();
  const { noteId } = useLocalSearchParams();
  useEffect(() => {
    getNote(`${noteId}`).then((res) => {
      console.log(res);
      if (res.data) return setNote(res.data);
    });
  }, []);
  return (
    <View>
      <Header
        headerLeft={<BackBtn />}
        headerRight={
          <TouchableOpacity
            onPress={async () => {
              note?.ISFAVORITE === "1"
                ? await removeFromFavorite(`${note?.ID}`)
                : await addToFavorite(`${note?.ID}`);
              getNote(`${noteId}`).then((res) => {
                if (res.data) return setNote(res.data);
              });
            }}
          >
            {note?.ISFAVORITE === "1" && (
              <MaterialIcons name="favorite" color={"#777"} size={24} />
            )}
            {note?.ISFAVORITE === "0" && (
              <MaterialIcons name="favorite-outline" color={"#777"} size={24} />
            )}
          </TouchableOpacity>
        }
        title={`${note?.TITLE}`}
      />
      <View className="p-4">
        <View className="h-[48px] w-[100%] flex flex-row gap-2 justify-end p-2">
          <TouchableOpacity onPress={() => {}}>
            <Link href={`./(root)/(note)/${noteId}`}>
              <MaterialIcons name="edit-document" color={"#777"} size={24} />
            </Link>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(`Delete ${"title"}`, `Are you sure to delete!`, [
                {
                  text: "Ok",
                  onPress: async () => {
                    await delateNote(`${note?.ID}`);
                    router.replace("/(root)/(note)");
                  },
                },
                { text: "Cancel", onPress: () => {} },
              ])
            }
          >
            <MaterialIcons name="delete" color={"#777"} size={24} />
          </TouchableOpacity>
        </View>
        <Line />
        <Text className="p-4 text-slate-500 text-justify shadow-sm shadow-slate-300">
          {note?.BODY}
        </Text>
      </View>
      {note?.TITLE && note?.BODY && (
        <EditModal title={note?.TITLE} body={note?.BODY} />
      )}
    </View>
  );
};

export default NoteId;
