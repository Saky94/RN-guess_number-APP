import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameScreen';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGamesHandler = (selectedNumber) => {
    setSelectedNumber(selectedNumber);
    setGuessRounds(null);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGamesHandler} />;

  if(selectedNumber && guessRounds <= 0) { //game is running
    content = <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler} />;
  } else if(guessRounds > 0) {
    content = <GameOver />;
  }

  return (
    <View style={styles.screen}>
      <Header title= "Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
