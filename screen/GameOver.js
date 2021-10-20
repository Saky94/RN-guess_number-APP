import React from "react";
import {View, Text, StyleSheet, Button, Image, Dimensions,ScrollView} from 'react-native';
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOver = props => {
    
    return (
    
    <ScrollView>
    <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageStyle}>
        <Image 
        source={require('../assets/xs.jpg')} 
        style={styles.image}
        resizeMode="cover"/>
        </View>
        <View style={styles.resultText}>
        <BodyText style={styles.bodyTextStyle}>Your phone needed <Text style={styles.highlightText}>{props.roundsNumber}</Text> rounds to guess 
        the nubmer <Text style={styles.highlightText}> {props.userNumber}</Text> </BodyText>
        </View>
        <MainButton onPress={props.onReset}>REPLAY GAME</MainButton>
    </View>
    </ScrollView>
   
    );
    
    
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding: 10
    },
    image:
    {
        width: '100%',
        height: '100%'

    },
    imageStyle:{
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height /50
    },
    highlightText:
    {
        color: colors.accent

    },
    resultText:
    {
     marginHorizontal: 45,
     marginVertical: Dimensions.get('window').height / 40,
     fontSize: Dimensions.get('window').height < 400 ? 16: 20
     
    },
    bodyTextStyle:
    {
        textAlign: 'center',
        fontStyle: 'italic'
    }

});
export default GameOver;