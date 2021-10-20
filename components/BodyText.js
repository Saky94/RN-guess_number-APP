import React from "react";
import {View, Text, StyleSheet} from 'react-native';


const BodyText = props => <Text style={{...styles.textBody, ...props.style}}>{props.children}</Text>

const styles=StyleSheet.create({
 textBody:
{
    fontFamily: 'open-sans',
    fontSize: 20
}

});
 
export default BodyText;