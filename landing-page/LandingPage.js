import React from 'react';
import {useFonts} from 'expo-font'
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import image from "../assets/landing-page/landing-page-pic.png"
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';

export const LandingPage = ({navigation}) => {
    
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-Bold.ttf')
    });
    if(!loaded){
        return null;
    }

    return (
        <View style={Styles.container}>
            <StatusBar style='light'/>
            <ImageBackground source={image} style={Styles.image}>
                <View>
                    <Text style={Styles.title}>¡Bienvenido!</Text>
                </View>
                <View style = {{marginHorizontal: 50}}>
                    <ButtonCustom callback={() => navigation.navigate('Register')} text={"Registrarse"}/>
                    <Text style={Styles.text}>o</Text>
                    <ButtonCustom callback={() => navigation.navigate('Login')} text={"Iniciar Sesión"}/>
                </View>
                
            </ImageBackground>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    image : {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        
    },
    text: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "InterSemiBold",
        marginVertical: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 48,
        color: "#fff",
        fontWeight: 'bold',
        fontFamily: "InterSemiBold",
        marginBottom: "120%"
    }
})