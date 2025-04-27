import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";
import { Link } from "expo-router";
import { getAllNotes, NOTESTYPE } from "@/utils/databases";

const Page = () => {
  const [notes, setNotes] = useState<NOTESTYPE[]>([]);
  useEffect(() => {
    const fetchNotes = async () => {
      const resault = await getAllNotes();
      const { status, data } = resault;
      if (status === "success") {
        setNotes(data);
      }
    };
    fetchNotes();
  }, [notes]);
  return (
    <>
      <Header title="Your Daily Notes" />
      <View className="flex flex-row gap-2 p-4">
        <SearchInput />
        <TouchableOpacity className="h-[42px] ring ring-blue-950 flex items-center justify-center px-4 bg-blue-950/80 text-white rounded-sm">
          <Text className="font-bold text-white">search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 flex flex-col px-4">
        {notes.length === 0 ? (
          <View className="flex-1 flex items-center justify-center">
            <Text className="text-xl font-bold text-slate-500">
              Empity Notes!
            </Text>
          </View>
        ) : (
          notes.map((Item, index) => {
            return (
              <Link
                key={index}
                href={`/(root)/(note)/${Item.ID}`}
                className="w-full my-1"
              >
                <View className="h-[48px] my-1 border border-slate-300 bg-slate-200 flex justify-center px-2 w-full">
                  <Text className="font-bold text-slate-500">{Item.TITLE}</Text>
                </View>
              </Link>
            );
          })
        )}
      </ScrollView>
    </>
  );
};

export default Page;
