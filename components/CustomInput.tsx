import { View, Text, TextInput } from "react-native";
import React from "react";
interface CustomInputProbs {
  label: string;
  placeholder?: string;
  isSecured: boolean;
  changeHandler: (e: string) => void;
}
const CustomInput = ({
  label,
  isSecured,
  changeHandler,
  placeholder,
}: CustomInputProbs) => {
  return (
    <View className="w-full flex flex-col my-2">
      <Text className="text-xl font-bold text-slate-600">{label}</Text>
      <TextInput
        placeholder={placeholder}
        className="w-full border border-slate-400 rounded-lg"
        onChangeText={(e) => changeHandler(e)}
      />
    </View>
  );
};

export default CustomInput;
