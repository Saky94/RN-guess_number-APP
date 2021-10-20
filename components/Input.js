import React from "react";
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return (
    <TextInput  {...props} style={{...styles.inputProperty,...props.style}} />);
};

const styles=StyleSheet.create({
    inputProperty:
    {   
        
        height: 30,
        borderBottomColor: 'silver',
        backgroundColor:'#ecc6d9',
        borderWidth: 0.5,
        marginVertical: 10
    }
});

 
export default Input;
