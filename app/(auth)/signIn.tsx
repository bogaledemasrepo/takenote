import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import BackBtn from "@/components/BackBtn";
import { useAuth } from "@/hooks/authContext";

const SignIn = () => {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  const handleSignIn = async () => {
    // await dropTable();
    if (userName.trim().length === 0) return setError("Username is required!");

    const { success, msg } = await login(userName, userPassword);
    console.log(success, msg);
    if (success) {
      router.navigate("/(root)");
    } else setError(msg);
  };
  return (
    <>
      <Header
        headerLeft={<BackBtn />}
        title="USER SIGN IN"
        headerRight={<Text> </Text>}
      />
      <View className="flex-1 flex items-center justify-center  p-4">
        <ScrollView scrollEnabled alwaysBounceVertical className="w-full">
          <View className="shadow-sm bg-neutral-300 w-full p-4 rounded-lg">
            <CustomInput
              label="user name"
              placeholder="jhon@gmail.com"
              isSecured={false}
              changeHandler={(e) => {
                setUserName(e);
              }}
            />
            <CustomInput
              label="password"
              isSecured={true}
              changeHandler={(e) => {
                setUserPassword(e);
              }}
            />
            {error && (
              <View className="bg-red-200 border border-red-300 p-4 my-2 rounded-lg">
                <Text>{error}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => handleSignIn()}
              className="w-full p-4 flex items-center justify-center rounded-lg shadow-sm bg-green-300"
            >
              <Text className="text-xl font-bold text-slate-600">Sign In</Text>
            </TouchableOpacity>
            <View className="py-4 flex items-center justify-center">
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/signUp")}
                className="flex flex-row"
              >
                <Text className="text-slate-400">I have not any account?</Text>
                <Text className="text-xl font-bold text-slate-600">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignIn;
