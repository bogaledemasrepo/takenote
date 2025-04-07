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
    <View className="rounded-sm min-h-[100%] border border-slate-300">
      <TextInput
        multiline
        className=" rounded-sm flex items-start justify-start content-start"
        value={value}
        onChangeText={onChangeText}
        placeholder="Note content..."
      />
    </View>
  );
};

export default NewnoteInput;
