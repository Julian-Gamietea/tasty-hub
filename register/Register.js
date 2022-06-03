import { View, StyleSheet, Text, ScrollView} from "react-native"
import {useFonts} from 'expo-font'
import * as React from 'react';
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { RadioButton } from 'react-native-paper';
import axios from "axios";

export const Register = ({navigation}) => {
    const [datos, setDatos] = React.useState({
        email: "",
        userName: ""
    })
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isValid, setIsValid] = React.useState(true);
    const [checked, setChecked] = React.useState('alumno');
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf')
    });
    if(!loaded){
        return null;
    }

    const handleChange = (text, input) => {
        setDatos({
            ...datos,
            [input] : text
        })
    }

    const register = async () => {
        if(checked ==='alumno'){
            var config = {
                method: 'post',
                url: 'https://tasty-hub.herokuapp.com/api/user/student/',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : datos
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                navigation.navigate('EmailSent', {mail: datos.email})
              })
              .catch(function async (error) {
                console.log(error.response.data)
                const mensaje = error.response.data;
                if (mensaje === 'There is already a user with that username'){
                    setIsValid(false);
                    setErrorMessage('El alias ingresado ya existe. Pruebe ingresando otro');
                }else if(mensaje === 'There is already a user with that email'){
                    navigation.navigate('ExistingMail')
                }else{
                    navigation.navigate('UncompletedRegistry')
                }
              });  
        }else{
            var config = {
                method: 'post',
                url: 'https://tasty-hub.herokuapp.com/api/user/guest/',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : datos
              };
              
              axios(config)
              .then(function () {
                navigation.navigate('EmailSent', {mail: datos.email})
              })
              .catch(function async (error) {
                const mensaje = error.response.data;
                if (mensaje === 'There is already a user with that email'){
                    setIsValid(false);
                    setErrorMessage('El alias ingresado ya existe. Pruebe ingresando otro');
                }
              });    
        }
        
    }

    return (
        <ScrollView style ={styles.container}>
            
                <View style = {styles.textContainer}>
                    <Text style = {styles.text}>
                        PASO 1/4
                    </Text>
                    <Text style = {styles.text}>
                        Ingrese sus
                    </Text>
                    <Text style = {styles.text}>
                        datos
                    </Text>
                </View>
                <View style = {styles.formContainer}>

                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Email </Text>
                        <InputTasty 
                            onChange={(text) => handleChange(text, 'email')}
                            placeholder = 'E.g: cooking@mail.com'
                            isValid={isValid}
                            
                        />
                    </View>

                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Alias </Text>
                        <InputTasty 
                            onChange={(text) => handleChange(text, 'userName')}
                            placeholder = 'E.g: Cooking'
                            isValid={isValid}
                            errorMessage={errorMessage}
                        />
                    </View >

                    <View style = {styles.formContainerItemRadio}>
                        <View style = {{flex: 2, marginTop:6}}>
                            <Text style = {styles.text}> Rol </Text>
                        </View>
                        <View style = {{flex: 3}}>
                            <View style = {styles.formContainerItemRadioHalf}>
                                <View style = {styles.formContainerItemRadioOption}>
                                    <RadioButton
                                        value="alumno"
                                        status={ checked === 'alumno' ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked('alumno')}
                                    
                                    /> 
                                    <Text style = {styles.textSmall}> Alumno </Text>
                                </View>
                                <View style = {styles.formContainerItemRadioOption} >
                                    <RadioButton
                                        value="invitado"
                                        status={ checked === 'invitado' ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked('invitado')}
                                    />
                                     <Text style = {styles.textSmall}> Invitado </Text>  
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>

                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom 
                        callback={() => register() } 
                        text = 'Continuar'
                        />
                    </View>

                    
                   
                </View>  
            
        </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor: '#fff',
            margin:0
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
            flex:.55,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
        ,
        formContainerItem2:{
            flex:.5,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 60,
            marginHorizontal: 15
        }
        ,
        button:{
            width: 20
        }
        ,
        formContainerItemRadio:{
            flex:.55,
            flexDirection: 'column'
        }
        ,
        formContainerItemRadioHalf:{
            flex:1,
            flexDirection:'row',
            justifyContent: 'center',
        }
        ,
        formContainerItemRadioOption:{
            flex:1,
            flexDirection:'row',
            justifyContent: 'center',
            alignItems:'center'
            
        }
        ,
        textSmall:{
            fontFamily: "InterRegular",
            fontSize: 16,
          
        }
    }
)