
import React, {useState} from 'react';
import {StyleSheet, Text, View , SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import  AppLoading  from 'expo-app-loading';

import Navbar from './components/Navbar';
import FirstScreen from './screen/FirstScreen';
import GameOver from './screen/GameOver';
import GameScreen from './screen/GameScreen';
import TitleText from './components/TitleText';

//sablon
const fetchFonts = () =>
{
   return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
     'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
   });
};

export default function App() {
  const [userNumber,setUserNumber]= useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded,setDataLoaded]= useState(false);
  
  if (!dataLoaded)
  {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} 
    onError={(err) => console.log(err)}  />
  }


  const configureNewGameHandler = () =>
{
  setGuessRounds(0);
  setUserNumber(null);
};

  
  const startGameHandler = (selectedNumber) =>
  {
    setUserNumber(selectedNumber);
    
  };

  const gameOverHandler = numberOfRounds =>
  {
    setGuessRounds(numberOfRounds);
  };

  let content= <FirstScreen onStart={startGameHandler}/>;



  if (userNumber && guessRounds <= 0)
{
  content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
}
else if (guessRounds >0)
{
  content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} onReset={configureNewGameHandler} />
}
  return (
    <SafeAreaView style={styles.appStyle}>
      <Navbar navbarText= "Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appStyle:
  {
    flex:1
  }
  
});


