import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
export default function GameOverScreen({
  roundsNumber,
  userNumber,
  onRestart,
}) {
  return (
    <View style={styles.screen}>
      <TitleText>Game is finished</TitleText>
      <View style={styles.imgContainer}>
        <Image source={require("../assets/success.png")} style={styles.img} />
      </View>
      <BodyText style={styles.bodyTextStyle}>
        Number of played rounds: <Text>{roundsNumber}</Text>
      </BodyText>
      <BodyText style={styles.bodyTextStyle}>
        Goal number was: <Text>{userNumber}</Text>
      </BodyText>
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
  imgContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "green",
    overflow: "hidden",
    margin: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  bodyTextStyle: {
    marginVertical: 5,
  },
});
