import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import colors from "../constants/colors";

const NumberComponent = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.second,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: colors.second,
        fontSize: 22

    }
});

export default NumberComponent;