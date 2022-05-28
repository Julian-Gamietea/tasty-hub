import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

export const InputTasty = (props) => {
    const [text, onChangeText] = React.useState("");
    return(
        <View style = {styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={props.placeholder}
            />
        </View>
        
    );
}

const styles = StyleSheet.create(
    {
        input: {
            backgroundColor:"rgba(235, 235, 235, 0)",
            borderRadius:30,
            borderColor:"hsla(48, 80%, 54%, 0.35)",
            borderWidth:1,
            fontFamily:"",
            fontSize:16,
            padding:15,
            textAlign:"left"
            
          },

          container: {
            backgroundColor: '#fff',
            alignItems: 'stretch',
            justifyContent: 'center'
          }
    }
)




