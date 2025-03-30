import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Line = () => {
  return <View style={styles.line}></View>;
};

export default Line;

const styles = StyleSheet.create({
  line: { width: "100%", height: 1, backgroundColor: "#00000020" },
});
