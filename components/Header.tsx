import { View, Text } from "react-native";
import React, { ReactNode } from "react";

const Header = ({
  headerLeft,
  title,
  headerRight,
}: {
  headerLeft?: ReactNode;
  title: string;
  headerRight?: ReactNode;
}) => {
  return (
    <View className="h-[60px] w-full shadow-sm shadow-slate-400 bg-neutral-200 flex flex-row items-center justify-between px-4">
      {headerLeft}
      <Text className="font-bold text-neutral-600 text-2xl text-center">
        {title}
      </Text>
      {headerRight}
    </View>
  );
};

export default Header;
