import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import colors from "../constants/colors";

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if(Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
    <View style={styles.buttonContainer}>
    <ButtonComponent activeOpacity={0.8} onPress={props.onClick}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </ButtonComponent>
    </View> )
};


const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.second,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    }
});

export default MainButton;