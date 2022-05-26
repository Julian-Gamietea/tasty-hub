import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const ButtonCustom = ({ text }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.button}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        backgroundColor: "#F3A200",
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 50
    },
    button: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    }
})