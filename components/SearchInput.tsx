import { View, TextInput } from "react-native";
import React from "react";

const SearchInput = () => {
  return (
    <View className="flex-1 h-[42px] rounded-sm px-3 ring ring-slate-300 bg-slate-200">
      <TextInput
        autoCorrect={false}
        className="flex-1 px-2   outline-none text-neutral-400"
        placeholder="Search note"
      />
    </View>
  );
};

export default SearchInput;
