import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const Button = ({
  disabled,
  title,
  pressHandler,
  saving,
}: {
  disabled: boolean;
  title: string;
  pressHandler: () => void;
  saving: boolean;
}) => {
  return (
    <TouchableOpacity
      className="w-full h-[42px] rounded-sm bg-blue-950/80 flex items-center justify-center"
      disabled={disabled}
      onPress={pressHandler}
    >
      {saving ? (
        <ActivityIndicator />
      ) : (
        <Text className="font-bold text-white">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
