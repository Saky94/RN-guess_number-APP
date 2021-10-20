import React , {useState, useEffect} from "react";
import {View, StyleSheet, Text, Button, TouchableWithoutFeedback,Keyboard, Alert,Dimensions,ScrollView,KeyboardAvoidingView} from 'react-native';

import CardInput from "../components/CardInput";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import { Colors } from "react-native/Libraries/NewAppScreen";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const FirstScreen = (props) => {
    const [enteredValue, setEnteredValue]= useState('');
    const [confirmed, setConfirmed]=useState(false);
    const [selectedNumber, setSelectedNumber]=useState();
    const [buttonWidth,setButtonWidth]=useState(Dimensions.get('window').width / 3 );
    
    

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    
    //fja za reset
    const resetInputHandler = () =>
    {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout=() => {
            setButtonWidth(Dimensions.get('window').width / 3)
        };
    
        Dimensions.addEventListener('change',updateLayout);
        return () => { 
            Dimensions.removeEventListener('change',updateLayout);
            };

    });
    //fja za conform
    const confirmInputHandler = () =>
    {   const chosenNumber = parseInt(enteredValue);
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.',
             [{text: 'Okey', style: 'destructive', onPress: resetInputHandler}]);
            return;

        }
        
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
    };

    let conformedOutput;
    if (confirmed) {
        conformedOutput = (
            <CardInput style={styles.summaryContainer}>
                <Text style={styles.selectedText}>You selected number</Text> 
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStart(selectedNumber) }>START GAME</MainButton>
            </CardInput> );
    }

     
         return (
        <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
        <View style={styles.screenOne}>
        <Text>{props.firstText}</Text>
        <View style={styles.textStart}>
        <Text style={styles.fStyle}>Welcome to the game.</Text>
        <TitleText style={styles.f2Style}>START GAME</TitleText>
        </View>
        <CardInput style={styles.inputForm}>
            
                <BodyText>Please, enter your number</BodyText>
                <Input style={styles.inputN} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="numeric" maxLength={2}
                onChangeText={numberInputHandler} value={enteredValue} />
            <View style={styles.buttonStyle}>
                <View style={{width: buttonWidth}}><Button title="RESET" onPress = {resetInputHandler} color={colors.accent}/></View>
                <View style={{width: buttonWidth}}><Button title="CONFIRM" onPress = {confirmInputHandler} color={colors.primary} /></View>
            </View>
            
            </CardInput>
            {conformedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles= StyleSheet.create({
    screenOne:
    {
        flex:1,
        alignItems: 'center',
    },
    text1:{
        fontSize:15,
        color: 'black',
        paddingTop:30,
        marginVertical: 10
    },
    buttonStyle:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputForm:
    {   
        
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
        
        
    },
    textStart:
    {   paddingTop:40,
        paddingBottom:30,
        alignItems: 'center'
  
    },
    fStyle:
    {
        fontSize:20,
        fontStyle: 'italic'
    },
    f2Style:
    {
        fontSize:30,
    },
    // bt:{
    //     width: 300,
    //     width: Dimensions.get('window').width/3
    // },
    inputN:
    {
        width: 80,
        textAlign: 'center'
    },
    summaryContainer:
    {
        marginTop: 20
    },
    selectedText:
    {
        textAlign: 'center',
        fontSize:15,
        fontStyle: 'italic'
    }
});

export default FirstScreen;