import React from "react";
import { Text, View, Stylesheet } from 'react-native';

const GameOver = props => {
    return(
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
        </View>
    );
};

const styles = Stylesheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOver;