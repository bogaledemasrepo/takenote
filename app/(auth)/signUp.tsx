import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import BackBtn from "@/components/BackBtn";
import { getUser } from "@/utils/databases";
import { useAuth } from "@/hooks/authContext";

const SignUp = () => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  const handleSignUp = async () => {
    if (fullName.trim().length === 0) return setError("Full name is required!");
    if (userName.trim().length === 0) return setError("username is required!");
    let { status, data } = await getUser(userName);
    if (!data) {
      register(fullName, userName, userPassword, "");
    } else setError("usename reserved...");
  };
  return (
    <>
      <Header
        headerLeft={<BackBtn />}
        title="USER SIGN UP"
        headerRight={<Text> </Text>}
      />
      <View className="flex-1 flex items-center justify-center  p-4">
        <ScrollView scrollEnabled alwaysBounceVertical className="w-full">
          <View className="shadow-sm bg-neutral-300 w-full p-4 rounded-lg">
            <CustomInput
              label="Full name"
              isSecured={false}
              changeHandler={(e) => setFullName(e)}
            />
            <CustomInput
              label="user name"
              placeholder="jhon@gmail.com"
              isSecured={false}
              changeHandler={(e) => setUserName(e)}
            />
            <CustomInput
              label="password"
              isSecured={true}
              changeHandler={(e) => setUserPassword(e)}
            />
            {error && (
              <View className="bg-red-200 border border-red-300 p-4 my-2 rounded-lg">
                <Text>{error}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => handleSignUp()}
              className="w-full p-4 flex items-center justify-center rounded-lg shadow-sm bg-green-300"
            >
              <Text className="text-xl font-bold text-slate-600">Sign Up</Text>
            </TouchableOpacity>
            <View className="py-4 flex items-center justify-center">
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/signIn")}
                className="flex flex-row"
              >
                <Text className="text-slate-400">
                  Allready have an account?
                </Text>
                <Text className="text-xl font-bold text-slate-600">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUp;
