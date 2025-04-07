import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import Line from "./Line";
import { Ionicons } from "@expo/vector-icons";

const Row = ({ title, icon }: { title: string; icon: ReactNode }) => {
  return (
    <TouchableOpacity className="h-16  flex justify-end">
      <View className="w-full flex flex-row items-center justify-between p-2">
        <View className="flex flex-row gap-2">
          {icon}
          <Text className="text-[#4e4e6c] text-xl font-semibold">{title}</Text>
        </View>
        {
          <Ionicons
            name="arrow-forward-circle-outline"
            size={24}
            color={"#4e4e6c"}
          />
        }
      </View>
      <Line />
    </TouchableOpacity>
  );
};

export default Row;
