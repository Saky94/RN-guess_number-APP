import React from "react";
import { Text, View, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
  return (
    
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
      {/* <Image source={require('../assets/success.png')}  */}
      <Image 
      fadeDuration={300}
      source={{uri: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/36017614/96075d8e8af049cdecf7d01c0e1fb6927048df65.png'}}
      style={styles.image}
      resizeMode="cover"
      />
      </View>
      <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>Your phone needed  <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>...</BodyText>
      </View>
      <MainButton onClick={props.onRestart} color={colors.primary}>NEW GAME</MainButton>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
      width: '100%',
      height: '100%'
    },
    imageContainer: {
      borderRadius: Dimensions.get('window').width * 0.7 / 2,
      borderWidth:3,
      borderColor: 'black',
      width: Dimensions.get('window').width * 0.7,
      height: Dimensions.get('window').width * 0.7,
      overflow: 'hidden',
      marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
      color: colors.primary,

    },
    resultContainer: {
      marginHorizontal: 30,
      fontFamily: 'open-sans-bold',
      marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
      textAlign: 'center',
      fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOver;
