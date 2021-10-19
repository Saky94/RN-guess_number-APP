import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, ScrollView, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import NumberComponent from "../components/NumberComponent";
import Card from "../components/Card";
import colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (<View style={styles.listItem}><BodyText>#{listLength - itemData.index}</BodyText><BodyText>{itemData.item}</BodyText></View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if(
      (direction === 'lower' && currentGuess < props.userChoice) || 
      (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert("Don\'t lie!", 'You know that is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
    return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const newNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(newNumber);
    //setRounds(rounds => rounds + 1);
    setPastGuesses(curPastGuesses => [newNumber.toString() ,...curPastGuesses])
  }; 

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberComponent>{currentGuess}</NumberComponent>
      <Card style={styles.buttonContainer}>
        <MainButton onClick={nextGuessHandler.bind(this, "lower")} color={colors.second}><AntDesign name="doubleleft" size={24}  color="white"/></MainButton>
        <MainButton onClick={nextGuessHandler.bind(this, "greater")} color={colors.second}><AntDesign name="doubleright" size={24}  color="white"/></MainButton>
      </Card>
      <View style={styles.listContainer}>
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
      </ScrollView> */}
      <FlatList keyExtractor={(item, index) => index.toString()} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%',
  },
  listItem: {
    borderColor: 'black',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  list: {
    flexGrow: 1,
    /* alignItems: 'center', */
    justifyContent: 'flex-end'
  }
});

export default GameScreen;
