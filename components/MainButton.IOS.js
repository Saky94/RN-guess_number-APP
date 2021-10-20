import React from "react";
import {View, Text, Button, StyleSheet,TouchableOpacity} from 'react-native';
import colors from "../constants/colors";

const MainButton = props => {
    
    return 
    <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
        <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
    </View>
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
        
    }
});

export default MainButton;
