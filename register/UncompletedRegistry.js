import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native"
import {useFonts} from 'expo-font'
import warning from '../assets/register/uncompleted-warning.png';
import { ButtonCustom } from "../shared-components/ButtonCustom";



export const UncompletedRegistry = ({navigation}) => {
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf')
    });
    if(!loaded){
        return null;
    }

    return(
        <View style = {styles.container}>
            <Image source = {warning} style = {styles.image}/>
            <Text style = {styles.text}>El mail corresponde a un registro incompleto{'\n'}{'\n'}Por favor, comuníquese con tastyhub.support@gmail.com</Text>
            <ButtonCustom navigation = {navigation} screen = "LandingPage" text = "Regresar a Inicio"/>
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
            alignItems: 'center'
        },
        image: {
            flex: 0,
            resizeMode: 'cover',
            marginTop: 20,
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
            marginBottom: 30,
            marginHorizontal: 20
        }
    })