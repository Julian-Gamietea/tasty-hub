import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font';
import image from '../assets/sign-in/login-image.png';
import { InputTasty } from '../shared-components/InputTasty';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { Link } from '@react-navigation/native';
import axios from 'axios';


export const SignIn = ({ navigation }) => {

    const [inputs, setInputs] = React.useState({
        alias: '',
        password: ''
    })

    const [status, setStatus] = React.useState("NO LOGIN");
    const [userData, setUserData] = React.useState({});
    const [isValid, setIsValid] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState({
        userError: '',
        passwordError: ''
    });

    const handleChange = (text, input) => {
        setInputs({
            ...inputs,
            [input] : text
        });
    }

    const login = async () => {
            await axios.get(`https://tasty-hub.herokuapp.com/api/auth/login?alias=${inputs.alias}&password=${inputs.password}`)
            .then (async (res) => {
                setUserData(res.data)
                await axios.get(`https://tasty-hub.herokuapp.com/api/user/check/registration/completion?email=${res.data.email}`)
                .then(res => navigation.navigate('Dashboard', userData))
                .catch( e => setStatus(e.response.data))})
            .catch( e => {
                setIsValid(false);
                setErrorMessage({userError: 'Usuario incorrecto', passwordError: 'Contraseña incorrecta'})
            });    
    }
    
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
                            onChange={(text) => handleChange(text, 'alias')}
                            value={inputs.alias}
                            isValid={isValid}
                            errorMessage={errorMessage.userError}
                            />
                    </View>

                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Contraseña </Text>
                        <InputTasty 
                            placeholder = 'E.g: CookingMaster123'
                            onChange={(text) => handleChange(text, 'password')}
                            value={inputs.password}
                            isValid={isValid}
                            errorMessage={errorMessage.passwordError}
                            passwrd
                        />
                    </View >
                    <Link to={{screen: 'RestorePassword'}} style={styles.link} >¿Olvidaste tu contraseña?</Link>

                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom callback={() => login()} text = 'Iniciar Sesión'/>
                    </View>
                    <Text>{status}</Text>
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
            marginTop: 40,
            marginHorizontal: 15
        },
        link : {
            flex: 1,
            fontWeight: 'bold',
            color: '#F3A200',
            textAlign: 'center',
            fontSize: 16,
            marginTop: 30

        }
        
    }
)