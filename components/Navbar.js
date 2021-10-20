import React from "react";
import {View, Text, StyleSheet,Platform} from 'react-native';
import colors from "../constants/colors";

const  Navbar = (props) => {
    return ( 
        <View style={{...styles.navbarStyle,...Platform.select({ios: styles.headerIOS , android: styles.headerAndroid})}}>
            <Text style={styles.navbarTextStyle}>{props.navbarText}</Text>
        </View>

     );
}

const styles= StyleSheet.create({
 navbarStyle:
 {
     
     width: '100%',
     height: 80,
     alignItems: 'center',
     justifyContent: 'center',
     
 },
 navbarTextStyle:
 {   
     paddingTop:20,
     color: 'black',
     fontSize: 30,
     fontFamily: 'open-sans-bold'
     
 },
 headerIOS:{
     backgroundColor: 'white',
     borderBottomColor: '#ccc',
     borderBottomWidth:  1
 },
 headerAndroid:{
    backgroundColor: '#ecc6d9'
    
 }
 

});

 
export default Navbar;