import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";

export const InputTasty = ({placeholder, onChange, value, passwrd, isValid, errorMessage, style, multiline}) => {
    const color = isValid ? "hsla(48, 80%, 54%, 0.35)" : "#FF6D6D";
    const styles = StyleSheet.create(
        {
            input: {
                backgroundColor:"rgba(235, 235, 235, 0)",
                borderRadius:30,
                borderColor: color,
                borderWidth:1,
                fontFamily:"",
                fontSize:16,
                padding:15,
                textAlign:"left"
                
              },
    
              container: {
                // backgroundColor: '#fff',
                alignItems: 'stretch',
                justifyContent: 'center'
              },
              error: {
                color:"#FF6D6D", 
                fontWeight:'bold',
                marginLeft: 10,
                fontSize: 14
              }
        }
    )
        return(
            <View style = {styles.container}>
                <TextInput
                    style={!style ? styles.input : style}
                    onChangeText={onChange}
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={passwrd}
                    multiline={multiline}
                />
                {!isValid && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
            
        );
}





