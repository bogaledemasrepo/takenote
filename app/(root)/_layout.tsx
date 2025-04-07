import { useAuth } from "@/hooks/authContext";
import NoteProvider from "@/hooks/notesContext";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";

export default () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) router.replace("/(auth)");
  }, [user]);
  return (
    <NoteProvider>
      <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tabs.Screen
          name="(note)"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="newNotes"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="add" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="star" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </NoteProvider>
  );
};
