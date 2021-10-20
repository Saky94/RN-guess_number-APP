import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import BodyText from "../components/BodyText";
import defaultStyles from "../constants/default-styles";
const numberGenerator = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return numberGenerator(min, max, exclude);
  } else {
    return randomNumber;
  }
};
// nije moglo u .map da se ubaci za scrollview, tj nije vracao nikakav content
// const listItemContainer = (value, indexx) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>{indexx}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>;
// );

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

export default function GameScreen(props) {
  const initialGuess = numberGenerator(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([currentGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) onGameOver(pastGuesses.length);
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "upper" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't cheat.", "Give correct answer", [
        { text: "Back", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = numberGenerator(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curGuesses) => [nextNumber.toString(), ...curGuesses]);
    // vraca pun niz
    // console.log(pastGuesses);
  };
  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }
  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </CustomButton>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Computer's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name={"md-remove"} size={24} color="white"></Ionicons>
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, "upper")}>
          <Ionicons name={"md-add"} size={24} color="white"></Ionicons>
        </CustomButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (
            <View key={guess} style={styles.listItem}>
              <BodyText>{index}</BodyText>
              <BodyText>{guess}</BodyText>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
  // listContainer: {
  //   flex: 1,
  //   // width: '80%', ovo je za scrollview
  //   width: "60%", // ovo je za flatlist
  //   width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  //   borderWidth: 3,
  //   borderColor: "red",
  // },
  list: {
    flexGrow: 1,
    alignItems: "center", // ovo je za scrollview
    // justifyContent: "flex-start",
    justifyContent: "flex-end", // ovo je za flatlist
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: Dimensions.get("window").width < 350 ? 5 : 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});
