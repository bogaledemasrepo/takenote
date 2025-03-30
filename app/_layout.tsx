import AuthProvider, { useAuth } from "@/hooks/authContext";
import "./global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import { initDb } from "@/utils/databases";
import { SafeAreaView } from "react-native-safe-area-context";
export default () => {
  const { user } = useAuth();
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
  }, [user]);
  if (!dbInitialised) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (user) {
    return (
      <SafeAreaView className="flex-1">
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(root)" />
          </Stack>
          <StatusBar style="dark" />
        </AuthProvider>
      </SafeAreaView>
    );
  } else
    return (
      <SafeAreaView className="flex-1">
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
          </Stack>
          <StatusBar style="dark" />
        </AuthProvider>
      </SafeAreaView>
    );
};
