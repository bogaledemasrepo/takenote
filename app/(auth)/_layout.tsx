import { useAuth } from "@/hooks/authContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user) router.replace("/(root)");
  }, [user]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
    </Stack>
  );
};
