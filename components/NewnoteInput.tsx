import { View, TextInput } from "react-native";
import React from "react";

const NewnoteInput = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View className="rounded-sm min-h-[70%]">
      <TextInput
        multiline
        className="flex-1 outline-none border border-black/20 flex items-start justify-items-starttext-slate-500"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default NewnoteInput;
