import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native"
import {useFonts} from 'expo-font'
import warning from '../assets/register/mail-not-confirmed.png';
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const EmailNotConfirmed = ({route, navigation}) => {
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf')
    });
    if(!loaded){
        return null;
    }
    const {mail} = route.params;

    return(
        <View style = {styles.container}>
            <Text style = {styles.step}>PASO 2/4</Text>
            <Text style = {styles.text}>Aún no confirmó su correo electrónico.{'\n'}{'\n'}Por favor, confírmelo para poder avanzar con el proceso de registro.</Text>
            <Image source = {warning} style = {styles.image}/>
            <ButtonCustom callback={()=> navigation.navigate('EmailSent', {mail: mail})} text = "Regresar"/>
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
        },
        step: {
            fontFamily: "InterSemiBold",
            textAlign: 'center',
            fontSize: 36,
            justifyContent: 'center',
            paddingBottom: 10,
            marginBottom: 30,
            marginHorizontal: 20
        }
    })