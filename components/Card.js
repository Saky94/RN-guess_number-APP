import React from "react";
import { View, StyleSheet } from "react-native";
const Card = ({ styles, children }) => {
  return <View style={{ ...styless.card, ...styles }}>{children}</View>;
};
const styless = StyleSheet.create({
  card: {
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
export default Card;
