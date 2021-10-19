import React from "react";
import { View, Text, StyleSheet} from 'react-native';
import colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    }
});

export default Header;