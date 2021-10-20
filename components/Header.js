import React from "react";
import { View, Text, StyleSheet, Platform} from 'react-native';
import colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'white' ,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    title: {
        color: Platform.OS === 'ios' ? colors.primary : 'black'
    },
    headerIOS: {
        backgroundColor: 'white' ,
        borderBottomColor: 'transparent',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: colors.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0
    }
});

export default Header;