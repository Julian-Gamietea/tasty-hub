
import { View, StyleSheet, Text, SafeAreaView,Image,ScrollView } from "react-native"
import React, { Component } from 'react'
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import axios from "axios";

export const InsertNewPassword = ({navigation,route}) =>{
  var userEmail = route.params.userEmail;
  const [state,setState] = React.useState("");
  const [inputPassword, setPassword] = React.useState({password:''})
  const [reEnterinputPassword, setReEnterPassword] = React.useState({reEnterPassword:''})
  const styles = StyleSheet.create(
    {
        image:{      
            marginTop:"5%"        
        },
        buttonContainer:{
          marginTop:"10%"
        },
        formContainer:{
          zIndex: 3, 
          elevation: 3, 
            flex:1,
            justifyContent:"center",
            alignContent:"center",
            flexDirection:"column",
            backgroundColor: '#fff',
            alignItems: 'stretch'
        }
        ,
        newPasswordItemFormContainer:{
          justifyContent:"center"
        },
        primaryText:{
          marginTop:"20%",
          marginBottom:"4%",
          fontWeight: "600",
          color: "#000000",
          fontSize: 28,
          letterSpacing: 0,
          alignContent:"flex-start",
          textAlign: "left"
  
        },
        errorMessage:{
          alignSelf:"center",
          alignContent:"center",
          fontWeight:"900",
          fontSize:14,
          marginTop:"2%",
          fontStyle:'italic',
          color:"#FF9494"
        },
        secondaryText:{
          width:"92%",

          fontWeight: "600",
          color: "#000000",
          fontSize: 29,
          marginTop:"10%",
          letterSpacing: 0,
          textAlign: "center",
        }
        
        ,
        imageContainer:{
            marginTop: "15%",
            alignItems: 'center'
        }
        ,
        newPasswordFormContainer:{
            flex:3,
            paddingLeft: "2%",
            paddingRight: "2%",
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: "8%"
        }
        
        
    }
  )

  const handleChangePassword = (text, password) => {
    setPassword({
        ...inputPassword,
        [password] : text
    });
  }
  const handleChangeReEnterPassword = (text2, reEnterPassword) => {
    setReEnterPassword({
        ...reEnterinputPassword,
        [reEnterPassword] : text2
    });
  }
  console.log(inputPassword.password)
  console.log(reEnterinputPassword.reEnterPassword)

  const changePassword = async () => {
    if(inputPassword.password===reEnterinputPassword.reEnterPassword){
      await axios.put('https://tasty-hub.herokuapp.com/api/auth/password/restore?email='+userEmail+'&password='+inputPassword.password)
        .then(()=>{
            navigation.navigate('PasswordRecoverySuccess')
     })
     
  }else{
    setState("Las contraseñas no son iguales")
    }
  }
        return (
            <ScrollView >
              <View style = {styles.formContainer}>
                  <View style = {styles.imageContainer}>
                    <Text style={styles.secondaryText}>Ultimo Paso!</Text>
                    <Image source={require('../assets/restore-password/last-step-password-recovery.png')} style = {styles.image}/>
                  </View>
                
                <View style = {styles.newPasswordFormContainer}>
                    <View>
                      <Text style = {styles.primaryText}> Nueva contraseña</Text>
                      <InputTasty onChange={(text) => handleChangePassword(text, 'password')} passwrd={true} placeholder = 'Ingrese aqui'/>
                    </View>
                    <View><Text style={styles.errorMessage}>{state}</Text></View>
                    <View style = {styles.newPasswordItemFormContainer}>
                      <Text style = {styles.primaryText}> Reingrese contraseña </Text>
                      <InputTasty onChange={(text) => handleChangeReEnterPassword(text, 'reEnterPassword')} passwrd={true} placeholder = 'Ingrese aqui'/>
                    </View>
                    <View style={styles.buttonContainer}>
                          <ButtonCustom callback={() => changePassword()} text = 'Continuar'/>
                    </View>
                </View>
                
              </View>

          </ScrollView>
        )  
  }
    export default InsertNewPassword;