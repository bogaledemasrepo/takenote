import { TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/authContext";

const Logout = () => {
  const { logout } = useAuth();
  return (
    <TouchableOpacity onPress={logout}>
      <MaterialIcons name="logout" color={"#777"} size={24} />
    </TouchableOpacity>
  );
};

export default Logout;
