import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GameOverScreen({
  roundsNumber,
  userNumber,
  onRestart,
}) {
  return (
    <View style={styles.screen}>
      <Text>Game is finished</Text>
      <Text>Number of played rounds: {roundsNumber}</Text>
      <Text>Goal number was: {userNumber}</Text>
      <Button title="Try again" onPress={onRestart}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
