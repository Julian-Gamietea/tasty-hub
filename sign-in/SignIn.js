import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font';
import image from '../assets/sign-in/login-image.png';
import { InputTasty } from '../shared-components/InputTasty';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { Link } from '@react-navigation/native';

export const SignIn = ({ navigation }) => {
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf')
    });
    if(!loaded){
        return null;
    }

    return (
        
        <ScrollView style ={styles.container}>
                <StatusBar style='dark'/>
                <Image source={image} style={styles.image}/>
                <View style = {styles.formContainer}>
                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Nombre de Usuario </Text>
                        <InputTasty 
                            placeholder = 'E.g: cooking'
                        />
                    </View>

                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Contraseña </Text>
                        <InputTasty 
                            placeholder = 'E.g: CookingMaster123'
                        />
                    </View >
                    <Link to={{screen: 'RestorePassword'}} style={styles.link} >¿Olvidaste tu contraseña?</Link>

                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom navigation = {navigation} mail = 'userEmail@gmail.com' screen = 'EmailSent' text = 'Iniciar Sesión'/>
                    </View>
                </View>
        </ScrollView>
    
    );
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
        },
        image : {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            marginTop: 80,
            width: 200,
            height: 200
        }
        ,
        text:{
            fontFamily: "InterSemiBold",
            fontSize: 36,
            paddingBottom:10,
        }
        ,
        textContainer:{
            flex:1,
            marginTop: 70,
            alignItems: 'center'
        }
        ,
        formContainer:{
            flex:3,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 40
        }
        ,
        formContainerItem:{
            flex:2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 20
        }
        ,
        formContainerItem2:{
            flex:3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 60,
            marginHorizontal: 15
        },
        link : {
            flex: 1,
            fontWeight: 'bold',
            color: '#F3A200',
            textAlign: 'center',
            fontSize: 16,
            marginTop: 50

        }
        
    }
)