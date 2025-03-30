import { TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const BackBtn = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity onPress={navigator.goBack}>
      <MaterialIcons name="arrow-back" color={"#777"} size={24} />
    </TouchableOpacity>
  );
};

export default BackBtn;
