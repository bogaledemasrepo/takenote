import "./global.css";
import { ActivityIndicator, Text, View } from "react-native";
import { initDb } from "@/utils/databases";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AuthProvider from "./../hooks/authContext";

export default () => {
  const [dbInitialised, setDbInitialized] = useState(false);

  useEffect(() => {
    function start() {
      initDb()
        .then((res) => {
          setDbInitialized(true);
        })
        .catch((err) => console.log(err));
    }
    start();
  }, []);
  if (!dbInitialised) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#222" }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(root)" />
        </Stack>
      </AuthProvider>
    </SafeAreaView>
  );
};
