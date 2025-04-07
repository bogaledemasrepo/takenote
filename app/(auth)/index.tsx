import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/authContext";

const index = () => {
  const { user, login, logout, register } = useAuth();
  const router = useRouter();
  return (
    <View className="flex-1 flex items-center justify-center p-8">
      <Text className="text-2xl font-bold text-slate-500">Wellcome to</Text>
      <Text className="text-3xl font-bold text-slate-500 mb-4">
        Daily Notes
      </Text>

      <TouchableOpacity
        onPress={() => router.navigate("/(auth)/signIn")}
        className="w-full p-4 flex items-center justify-center rounded-lg shadow-sm bg-green-300"
      >
        <Text className="text-xl font-bold text-slate-600">Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
