import React from "react";
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const CardInput = props => {
    return  (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
        
        );
     
};

const styles = StyleSheet.create({
    card:
    {
        paddingBottom:20,
        marginVertical:10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        elevation: 6,
        borderRadius: 6
    }
});
 
export default CardInput;