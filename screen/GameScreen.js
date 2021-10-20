import React, {useState, useRef, useEffect} from "react";
import {View, Text, Button, StyleSheet, Alert, ScrollView, Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import CardInput from '../components/CardInput';
import colors from "../constants/colors";
import GameOver from "./GameOver";
import defaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { AntDesign } from '@expo/vector-icons';
import BodyText from "../components/BodyText";
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min=Math.ceil(min);
    max=Math.floor(max);
    const randNum= Math.floor(Math.random() * (max-min))+min;
    if(randNum === exclude)
    {
        return generateRandomBetween(min, max, exclude);
    }
    else
    {
        return randNum;
    }
}; 

async function changeScreenOrientation() {

    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  }

  changeScreenOrientation();  
const renderListItem= (value, numberOfRound) => 
( <View key={value} style={styles.listItem}>
    <BodyText>#{numberOfRound}</BodyText>
    <BodyText>{value}</BodyText>
</View>);

const GameScreen = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
   
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const[pastGuesses,setPastGuesses]= useState([initialGuess]);
    const[deviceWidth,setDeviceWidth]=useState(Dimensions.get('window').width);
    const[deviceHight,setDeviceHight]=useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} =props;

    useEffect(()=> {
    const updateLayout = () => {
    setDeviceWidth(Dimensions.get('window').width);
    setDeviceHight(Dimensions.get('window').width);

    };

    Dimensions.addEventListener('change', updateLayout)

    return () => {
        Dimensions.removeEventListener('change', updateLayout);
    };
    });

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        };

    },[currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction =>{
        if(direction === 'lower' && currentGuess < props.userChoice || (direction === 'greater' && currentGuess> props.userChoice))
        {Alert.alert('Are your sure?','You know that this is wrong....', [{text: 'Sory!', style: 'cancel'}]);
        return;
    }
    if (direction === 'lower'){
        currentHigh.current = currentGuess;
    }
    else{
        currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1);
    setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
    
 };
 if(deviceWidth < 300)
 {
     listContainer =styles.listContainer;
 }

    if(deviceHight < 500)
    {
        return (
            <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponents's Guess</Text>
            <View style={styles.control}>
            <MainButton onPress={nextGuessHandler.bind(this,'lower')} color= 'red'>
            <AntDesign name= "doubleleft" size={28} color="white"/>
                </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>
            <MainButton onPress={nextGuessHandler.bind(this,'greater')} color='green'> 
            <AntDesign name= "doubleright" size={28} color="white"/>
                </MainButton>
            </View>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
            )
    }

    return(
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponents's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <CardInput style={styles.buttonContainer}>
                <View style={styles.btni}>
                <MainButton onPress={nextGuessHandler.bind(this,'lower')} color= 'red'>
                    <AntDesign name= "doubleleft" size={28} color="white"/>
                </MainButton>
                </View>
                <View style={styles.btni}>
                <MainButton onPress={nextGuessHandler.bind(this,'greater')} color='green'> 
                <AntDesign name= "doubleright" size={28} color="white"/>
                </MainButton>
                </View>
            </CardInput>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    screen:
    {
        flex:1,
        padding:10,
        alignItems: 'center'

    },
    control:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    buttonContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20: 10,
        width: 400,
        maxWidth: '90%',
        

    },
    btni:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:20,
        
    },
    listItem:
    {
        borderColor: 'silver',
        borderWidth:1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    listContainer:
    {   
        flex:1,
        width: Dimensions.get('window').width > 300 ? '60%' : '80%',
        
    },
    list:
    {
       alignItems: 'center' ,
       justifyContent: 'flex-end',
       flexGrow: 1
    }
   
    
});
 
export default GameScreen;