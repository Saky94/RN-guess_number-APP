import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import colors from "../constants/colors";

const MainButton = props => {

    return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onClick}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
 )
};


const styles = StyleSheet.create({
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