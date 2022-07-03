
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, Dimensions } from "react-native"
import React, { Component } from 'react'
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import axios from "axios";

export const InsertNewPassword = ({ navigation, route }) => {
  var userEmail = route.params.userEmail;
  var userEmail = 'agustin.sturba@hotmail.com'
  const [isValid, setIsValid] = React.useState(true)
  const [state, setState] = React.useState("");
  const [inputPassword, setPassword] = React.useState({ password: '' })
  const [reEnterinputPassword, setReEnterPassword] = React.useState({ reEnterPassword: '' })
  const styles = StyleSheet.create(
    {
      image: {
        marginTop: "5%"
      },
      buttonContainer: {
        flex: 1,
        width: 300,
        marginTop: "30%",
        alignSelf: 'center'
      },
      formContainer: {
        minHeight: Dimensions.get('window').height,
        zIndex: 3,
        elevation: 3,
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'stretch'
      }
      ,
      newPasswordItemFormContainer: {
        flex: 1,
        marginTop: 15,
        justifyContent: "center"
      },
      primaryText: {
        fontWeight: "600",
        color: "#000000",
        fontSize: 28,
        letterSpacing: 0,
        alignContent: "flex-start",
        textAlign: "left"

      },
      errorMessage: {
        alignSelf: "center",
        alignContent: "center",
        fontWeight: "900",
        fontSize: 14,
        marginTop: "2%",
        fontStyle: 'italic',
        color: "#FF9494"
      },
      secondaryText: {
        width: "92%",

        fontWeight: "600",
        color: "#000000",
        fontSize: 29,
        marginTop: "10%",
        letterSpacing: 0,
        textAlign: "center",
      }

      ,
      imageContainer: {
        flex: 1,
        marginTop: "15%",
        alignItems: 'center'
      }
      ,
      newPasswordFormContainer: {
        flex: 1,
        paddingLeft: "2%",
        paddingRight: "2%",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5
      }


    }
  )

  const handleChangePassword = (text, password) => {
    setPassword({
      ...inputPassword,
      [password]: text
    });
  }
  const handleChangeReEnterPassword = (text2, reEnterPassword) => {
    setReEnterPassword({
      ...reEnterinputPassword,
      [reEnterPassword]: text2
    });
  }


  const changePassword = async () => {
    setIsValid(true)
    setState("")
    if (inputPassword.password === reEnterinputPassword.reEnterPassword) {
      await axios.put('https://tasty-hub.herokuapp.com/api/auth/password/restore?email=' + userEmail + '&password=' + inputPassword.password)
        .then(() => {
          navigation.navigate('SuccessFullPasswordRecovery')
        })

    } else {
      setIsValid(false)
      setState("Las contraseñas no son iguales")
    }
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <Text style={styles.secondaryText}>Ultimo Paso!</Text>
          <Image source={require('../assets/restore-password/last-step-password-recovery.png')} style={styles.image} />
        </View>

        <View style={styles.newPasswordFormContainer}>
          <View>
            <Text style={styles.primaryText}> Nueva contraseña</Text>
            <InputTasty isValid={isValid} errorMessage={"Las contraseñas no coinciden"} onChange={(text) => handleChangePassword(text, 'password')} passwrd={true} placeholder='Ingrese aqui' />
          </View>
          {/* <View><Text style={styles.errorMessage}>{state}</Text></View> */}
          <View style={styles.newPasswordItemFormContainer}>
            <Text style={styles.primaryText}> Reingrese contraseña </Text>
            <InputTasty isValid={isValid} errorMessage={"Las contraseñas no coinciden"} onChange={(text) => handleChangeReEnterPassword(text, 'reEnterPassword')} passwrd={true} placeholder='Ingrese aqui' />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonCustom callback={() => changePassword()} text='Continuar' />
          </View>
        </View>

      </View>

    </ScrollView>
  )
}
export default InsertNewPassword;