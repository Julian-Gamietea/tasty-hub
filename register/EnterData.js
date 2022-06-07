import { View, StyleSheet, Text, ScrollView} from "react-native"
import {useFonts} from 'expo-font'
import * as React from 'react';
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import axios from "axios";


export const EnterData = ({route, navigation}) => {
   
    const [datos, setDatos] = React.useState({
        nombre: "",
        contraseña: "",
        reingresada: ""
    })
    const [errorMessageContraseña, setErrorMessageContraseña] = React.useState('');
    const [errorMessageNombre, setErrorMessageNombre] = React.useState('');
    const [errorMessageReingrese, setErrorMessageReingrese] = React.useState('');
    const [isValidContraseña, setIsValidContraseña] = React.useState(true);
    const [isValidNombre, setIsValidNombre] = React.useState(true);
    const [isValidReingrese, setIsValidReingrese] = React.useState(true);

    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf')
    });
    if(!loaded){
        return null;
    }
    const {mail} = route.params;

    const enterData = () => {

        setIsValidContraseña(true)
        setIsValidNombre(true)
        setIsValidReingrese(true)
        setErrorMessageContraseña("")
        setErrorMessageNombre("")
        setErrorMessageReingrese("")

        const status = validations()
        if(status){
            axios.get(`https://tasty-hub.herokuapp.com/api/user/email/${mail}`)
            .then((res)=>{
                const data = {
                    name: datos.nombre,
                    password: datos.contraseña,
                    id: res.data.id,
                    email: res.data.email,
                    enabled: res.data.enabled,
                    role: res.data.role,
                    userName: res.data.userName,
                    registrationTimestamp: res.data.registrationTimestamp
                }
                console.log(data)

                var config = {
                    method: 'put',
                    url: 'https://tasty-hub.herokuapp.com/api/user/',
                    headers: { 
                      'Content-Type': 'application/json'
                    },
                    data : data
                  };
                  
                    axios(config)
                .then(()=> {
                    navigation.navigate('EnterAvatar')
                })
                .catch((err)=> console.log(err))
            })
        }
    }
    const handleChange = (text, input) => {
        setDatos({
            ...datos,
            [input] : text
        })
    }
    const validations = () => {
        if(datos.nombre === "" || !isNaN(datos.nombre)){
            setErrorMessageNombre("Ingrese un nombre válido")
            setIsValidNombre(false)
            return false
        }else if(datos.contraseña === ""){
            setErrorMessageContraseña("Ingrese una contraseña válida")
            setIsValidContraseña(false)
            return false
        }else if(datos.reingresada === ""){
            setErrorMessageReingrese("Ingrese una contraseña válida")
            setIsValidReingrese(false)
            return false
        }else{
            if(datos.contraseña !== datos.reingresada){
                setErrorMessageContraseña("Las contraseñas no coinciden")
                setErrorMessageReingrese("Las contraseñas no coinciden")
                setIsValidReingrese(false)
                setIsValidContraseña(false)
                return false
            }else{
                return true
            }
        }
    }
    

    return (
        <ScrollView style ={styles.container}>
            
                <View style = {styles.textContainer}>
                    <Text style = {styles.text}>
                        PASO 3/4
                    </Text>
                    <Text style = {styles.text2}>
                        Ingrese los {'\n'} ultimos datos 
                    </Text>
                    
                </View>
                <View style = {styles.formContainer}>

                    <View style = {styles.formContainerItem}>
                        <View style = {styles.textLine} >
                            <Text style = {styles.text3}> Nombre completo </Text>
                            <Text style = {styles.asterisk}> *</Text>
                        </View>
                        
                        <InputTasty 
                            placeholder = 'E.g: Juan Pérez'
                            isValid={isValidNombre}
                            value={datos.nombre}
                            errorMessage={errorMessageNombre}
                            onChange={(text) => handleChange(text, 'nombre')}
                        />
                    </View>

                    <View style = {styles.formContainerItem}>
                        <View style = {styles.textLine}>
                            <Text style = {styles.text3}> Contraseña</Text>
                            <Text style = {styles.asterisk}> *</Text>
                        </View>
                        
                        <InputTasty 
                            placeholder = 'Ingrese aqui'
                            isValid={isValidContraseña}
                            errorMessage={errorMessageContraseña}
                            value={datos.contraseña}
                            onChange={(text) => handleChange(text, 'contraseña')}
                        />
                    </View >

                    <View style = {styles.formContainerItem}>
                        <View style = {styles.textLine}>
                            <Text style = {styles.text3}> Reingrese contraseña</Text>
                            <Text style = {styles.asterisk}> *</Text>
                        </View>
                        
                        <InputTasty 
                            placeholder = 'Ingrese aqui'
                            isValid={isValidReingrese}
                            errorMessage={errorMessageReingrese}
                            value={datos.reingresada}
                            onChange={(text) => handleChange(text, 'reingresada')}
                        />
                    </View >   
                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom 
                        callback={() => enterData() }
                        text = 'Continuar'/>
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
        text2:{
            fontFamily: "InterSemiBold",
            fontSize: 36,
            paddingBottom:18,
            textAlign: 'center'
        }
        ,
        text3:{
            fontFamily: "InterSemiBold",
            fontSize: 26,
            paddingBottom:10
        }
        ,
        asterisk:{
            fontFamily: "InterSemiBold",
            fontSize: 26,
            color: '#f3a200'
        }
        ,
        textLine:{
            flex:1,
            flexDirection: "row"
        }
        ,
        textContainer:{
            flex:1,
            marginTop: 70,
            alignItems: 'center'
        }
        ,
        formContainer:{
            flex:4,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start'
        }
        ,
        formContainerItem:{
            flex:1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 20
        }
        ,
        formContainerItem2:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 15,
            marginBottom: 20,
            marginTop: 25
        }
        ,
        button:{
            width: 20
        }
        
    }
)