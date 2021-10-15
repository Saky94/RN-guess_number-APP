import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import colors from "../constants/colors";
export default function CustomButton({ onPress, children }) {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
      <View style={stlyes.button}>
        <Text style={stlyes.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
const stlyes = StyleSheet.create({
  button: {
    backgroundColor: colors.default,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
  },
});
