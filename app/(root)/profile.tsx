import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/authContext";
import { Ionicons } from "@expo/vector-icons";
import Row from "@/components/Row";
import { useNotes } from "@/hooks/notesContext";

const profile = () => {
  const { notes } = useNotes();
  const { user, logout } = useAuth();
  if (!user) return null;
  const userData = JSON.parse(user);

  return (
    <View className="flex-1 flex items-center px-4">
      <View className=" w-full h-12 rounded-sm flex flex-row items-center justify-between">
        <Text className="text-xl font-bold text-[#4e4e6c]">Profile</Text>
        <Ionicons
          className="font-bold"
          name="notifications"
          color={"#4e4e6c"}
          size={24}
        />
      </View>
      <View className="w-24 h-24 rounded-full bg-[#4e4e6c]"></View>
      <Text className="text-xl font-semibold text-[#4e4e6c] my-4">
        {userData["FULLNAME"]}
      </Text>
      <View className="flex-1 p-4 w-full">
        <Row
          title={`My notes(${notes.length})`}
          icon={<Ionicons name="book-outline" size={24} color={"#4e4e6c"} />}
        />
        <Row
          title="Languages"
          icon={<Ionicons name="language-sharp" size={24} color={"#4e4e6c"} />}
        />
        <Row
          title="Settings"
          icon={
            <Ionicons name="settings-outline" size={24} color={"#4e4e6c"} />
          }
        />
      </View>
      <TouchableOpacity
        onPress={logout}
        className="flex self-start w-fit flex-row items-center p-2 rounded-sm m-4 border border-[#4e4e6c]"
      >
        <Ionicons
          className="font-bold"
          name="log-out"
          color={"#4e4e6c"}
          size={24}
        />
        <Text className="text-[#4e4e6c] font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
