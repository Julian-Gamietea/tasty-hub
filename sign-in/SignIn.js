import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import image from '../assets/sign-in/login-image.png';
import { InputTasty } from '../shared-components/InputTasty';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { Link } from '@react-navigation/native';
import { loginReducer, initialState } from './loginReducer';
import axios from 'axios';


export const SignIn = ({ navigation }) => {


    const [loginState, loginDispatch] = React.useReducer(loginReducer, initialState);
    const { alias, password, isAliasValid, isPasswordValid, userErrorMessage, passwordErrorMessage } = loginState;

    const areInputsValid = () => {
        if (alias === "")
            loginDispatch({ type: "aliasError", error: "No puede dejar este campo vacío" });
        if (password === "")
            loginDispatch({ type: "passwordError", error: "No puede dejar este campo vacío" });
        if (alias !== "" && password !== "") {
            return true;
        } else {
            return false;
        }
    }

    const login = async () => {
        if (areInputsValid()) {
            axios.get(`https://tasty-hub.herokuapp.com/api/user/username/${alias}`)
                .then((res) => {
                    axios.get(`https://tasty-hub.herokuapp.com/api/user/check/registration/completion?email=${res.data.email}`)
                        .then((res) => {
                            axios.get(`https://tasty-hub.herokuapp.com/api/auth/login?alias=${alias}&password=${password}`)
                                .then((res) => {
                                    loginDispatch({ type: "reset" })
                                    navigation.navigate('Dashboard', res.data);
                                })
                                .catch(e => {
                                    loginDispatch({ type: "aliasError", error: "Usuario Incorrecto" });
                                    loginDispatch({ type: "passwordError", error: "Contraseña Incorrecta" });
                                })
                        })
                        .catch(e => {
                            loginDispatch({ type: "reset" })
                            navigation.navigate('IncompleteRegistry');
                        });
                }
                )
                .catch(e => {
                    loginDispatch({ type: "aliasError", error: "Usuario Incorrecto" });
                    loginDispatch({ type: "passwordError", error: "Contraseña Incorrecta" });
                });
        }
    }

    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });
    if (!loaded) {
        return null;
    }



    return (

        <ScrollView style={styles.container}>
            <StatusBar style='dark' />
            <Image source={image} style={styles.image} />
            <View style={styles.formContainer}>
                <View style={styles.formContainerItem}>
                    <Text style={styles.text}> Nombre de Usuario </Text>
                    <InputTasty
                        placeholder='E.g: cooking'
                        onChange={(text) => loginDispatch({
                            type: "fieldUpdate",
                            field: "alias",
                            value: text
                        })}
                        value={alias}
                        isValid={isAliasValid}
                        errorMessage={userErrorMessage}
                    />
                </View>

                <View style={styles.formContainerItem}>
                    <Text style={styles.text}> Contraseña </Text>
                    <InputTasty
                        placeholder='E.g: CookingMaster123'
                        onChange={(text) => loginDispatch({
                            type: "fieldUpdate",
                            field: "password",
                            value: text
                        })}
                        value={password}
                        isValid={isPasswordValid}
                        errorMessage={passwordErrorMessage}
                        passwrd
                    />
                </View >
                <Link to={{ screen: 'RestorePassword' }} style={styles.link} >¿Olvidaste tu contraseña?</Link>

                <View style={styles.formContainerItem2}>
                    <ButtonCustom callback={() => login()} text='Iniciar Sesión' />
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            marginTop: 40,
            width: 200,
            height: 200
        }
        ,
        text: {
            fontFamily: "InterSemiBold",
            fontSize: 36,
            paddingBottom: 10,
        }
        ,
        textContainer: {
            flex: 1,
            marginTop: 70,
            alignItems: 'center'
        }
        ,
        formContainer: {
            flex: 3,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 40
        }
        ,
        formContainerItem: {
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 20
        }
        ,
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 40,
            marginHorizontal: 15
        },
        link: {
            flex: 1,
            fontWeight: 'bold',
            color: '#F3A200',
            textAlign: 'center',
            fontSize: 16,
            marginTop: 30

        }

    }
)