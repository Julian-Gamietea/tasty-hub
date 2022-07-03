import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font'

export const ButtonCustom = ({ text, callback, style }) => {
    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf')
    });
    if (!loaded) {
        return null;
    }

    return (
        <TouchableOpacity onPress={callback} style={[styles.container, style]}>
            <Text style={styles.button}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { 
        elevation: 8,
        backgroundColor: "#F3A200",
        borderRadius: 15,
        padding: 15
    },
    button: {
        fontSize: 16,
        fontFamily: 'InterSemiBold',
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center"
    }
})