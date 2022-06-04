import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native"
import { useFonts } from 'expo-font'
import warning from '../assets/register/incomplete-warning.png';
import { ButtonCustom } from "../shared-components/ButtonCustom";



export const IncompleteRegistry = ({ navigation }) => {
    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf')
    });
    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image source={warning} style={styles.image} />
            <Text style={styles.text}>El mail corresponde a un registro incompleto{'\n'}{'\n'}Por favor, comuníquese con tastyhub.support@gmail.com</Text>
            <View style={styles.button}>
                <ButtonCustom callback={() => navigation.navigate('Home')} text="Regresar a Inicio" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
            justifyContent: 'center',

        },
        image: {
            flex: 0,
            alignSelf: 'center',
            resizeMode: 'cover',
            marginTop: 80,
            marginBottom: 50,
            width: 200,
            height: 200
        },
        text: {
            fontFamily: "InterSemiBold",
            textAlign: 'center',
            fontSize: 22,
            justifyContent: 'center',
            paddingBottom: 10,
            marginBottom: 60,
            marginTop: 20,
            marginHorizontal: 20
        },
        button: {
            flex: 1,
            marginHorizontal: 30
        }
    })