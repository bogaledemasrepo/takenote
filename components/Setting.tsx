import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";

const Setting = () => {
  return (
    <>
      <Header title="About application" />
      <View className="flex-1 p-4">
        <View className="flex-1 bg-neutral-800s">
          <Text className="text-slate-600 font-bold py-2 px-4">
            For any one who uses this application or read this text!
          </Text>
          <View className="my-2 shadow shadow-slate-300">
            <Text className="text-slate-500 text-justify p-4">
              I developed this app using react-native with latest expo features.
              If you have any sugession to help me or work with me to develop
              your skill,I am exited to work/learn/code with you.
            </Text>
          </View>
          <View className="flex-1 flex flex-col my-2 shadow shadow-slate-300 p-4">
            <Text className="text-xl font-bold text-slate-500 text-center ">
              Contact me!
            </Text>
            <Text className="p-1 text-slate-500">bogidemas@gmail.com</Text>
            <Text className="p-1 text-slate-500">t.me/bogaledemas</Text>
          </View>
          <Text className="text-slate-500 px-4 py-2">
            You can also get this app code repository
            https://github.com/bogaledemasrepo/
          </Text>
        </View>
        <Text className="text-slate-500 text-center underline font-semibold">
          @Right reserverd to developer Bogale.
        </Text>
      </View>
    </>
  );
};

export default Setting;
