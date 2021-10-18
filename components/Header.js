import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import colors from "../constants/colors";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    paddingTop: 30,
    backgroundColor: Platform.OS === "android" ? "blue" : "yellow",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: Platform.OS === "android" ? 5 : 0,
    borderBottomColor: Platform.OS === "android" ? "red" : "green",
  },
  headerTitle: {
    color: "black",
    fontSize: 20,
  },
});
