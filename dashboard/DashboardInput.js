import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

export const DashboardInput = ({ placeholder, onChange, value, onClick, icon }) => {
    
    const styles = StyleSheet.create(
        {
            input: {
                backgroundColor: "rgba(235, 235, 235, 0)",
                fontFamily: "",
                fontSize: 16,
                padding: 15,
                textAlign: "left",
                maxWidth: 260,
                minWidth: 260

            },
            container: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 30,
                borderColor: "hsla(48, 80%, 54%, 0.35)",
                borderWidth: 1,
                maxHeight: 50,
                maxWidth: 320,
                minWidth: 320

            },
            searchButton: {
                
                backgroundColor: "#F3A200",
                minWidth: 56,
                borderBottomRightRadius: 30,
                borderTopRightRadius: 30,
                minHeight: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    )


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
            />
            <TouchableOpacity style={styles.searchButton} onPress={onClick}>
                <MaterialIcons name={icon ? icon : 'search'} size={32} color="#553900" />
            </TouchableOpacity>
        </View>

    );
}





