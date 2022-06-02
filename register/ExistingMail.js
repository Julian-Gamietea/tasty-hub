import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native"
import {useFonts} from 'expo-font'
import image from '../assets/register/existing-mail.png';
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const ExistingMail = ({navigation}) => {
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf')
    });
    if(!loaded){
        return null;
    }

    return(
        <View style = {styles.container}>
            <Image source = {image} style = {styles.image}/>
            <Text style = {styles.text}> El mail ingresado ya se encuentra en uso </Text>
            <ButtonCustom navigation = {navigation} screen = "InsertMail" text = "Recuperar Contraseña"/>
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
            marginLeft: 20,
            marginBottom: 70,
            width: 200,
            height: 200
        },
        text: {
            fontFamily: "InterSemiBold",
            fontSize: 36,
            paddingBottom: 10,
            marginBottom: 30
        }
    })