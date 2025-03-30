import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import Logout from "@/components/Logout";

const index = () => {
  return (
    <>
      <Header
        headerLeft={<Text> </Text>}
        title="Home"
        headerRight={<Logout />}
      />
      <View>
        <Text>index</Text>
      </View>
    </>
  );
};

export default index;
