import React from "react";
import {View, Text, Button, StyleSheet,TouchableOpacity, TouchableNativeFeedback,Platform} from 'react-native';
import colors from "../constants/colors";

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;
    if(Platform.Version >=21)
    {
        ButtonComponent=TouchableNativeFeedback;
    }
    return (
    <View style={styles.buttonContainer}>
    <ButtonComponent onPress={props.onPress} activeOpacity={0.5}>
        <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </ButtonComponent>
    </View>);
}

const styles=StyleSheet.create({
    buttonStyle:{
        backgroundColor: colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25

    },
    buttonText:{
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
        
    },
    buttonContainer:{
        borderRadius: 25,
        overflow:'hidden'
    }
});

export default MainButton;
