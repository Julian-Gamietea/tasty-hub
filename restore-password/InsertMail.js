import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import React, { startTransition } from 'react'
import { InputTasty } from '../shared-components/InputTasty'
import { ButtonCustom } from '../shared-components/ButtonCustom'
import axios from 'axios';
import validateEmail from '../validations/validateEmail';
import { isRegistryComplete } from '../validations/isRegistryComplete';
import { MaterialIcons } from '@expo/vector-icons';

export const InsertMail = ({ navigation }) => {
  const [isValid, setIsValid] = React.useState(true)
  const [status, setStatus] = React.useState("");
  const [inputMail, setInputMail] = React.useState({ mail: '' })
  const mail = inputMail.mail
  const handleChange = (text, mail) => {
    setInputMail({
      ...inputMail,
      [mail]: text
    });
  }
  const sentCode = async () => {
    setIsValid(true)
    setStatus("")
  
    if (validateEmail(mail)) {
      const status = await isRegistryComplete(mail)
      if(status.value){
        const userStudent = await isUserStudent(mail)
        if (!userStudent) {
          axios.get('https://tasty-hub.herokuapp.com/api/auth/token?email=' + mail)
            .then(() => {
              navigation.navigate('InsertCode', { mail: mail })
            })
            .catch((e) => {
              if (e.response.status == 422) {
                navigation.navigate('InsertCode', { mail: mail })
              }else{
                console.log(e)
              }
            })
        }else{
          navigation.navigate('UserStudentConflict')
        }
      }else{
        if(status.msj === 'not found'){
          setIsValid(false)
          setStatus("El mail ingresado no se encuentra registrado")
        }else{
          navigation.navigate('IncompleteRegistry')
        }
      }
      
    }else {
      setIsValid(false)
      setStatus("El mail ingresado no es valido")
    }

  }
  const isUserStudent = async (email) => {
    try{
      const response = await axios.get(`https://tasty-hub.herokuapp.com/api/user/email/${email}`)
      if (response.data.role === "STUDENT") {
        return true;
      }
      else {
        return false
      }
    }catch(error){
      console.log(error)
    }
  }



  return (
    <ScrollView style={styles.scrollView}>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <MaterialIcons name="email" size={120} color="#F3A200" />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formContainerItem}>
            <Text style={styles.primaryText}> Ingrese su email </Text>
            <InputTasty onChange={(text) => handleChange(text, 'mail')}
              value={inputMail.mail}
              isValid={isValid}
              placeholder='E.g: cooking@mail.com' />

            <Text style={styles.errorMessage}>{status}</Text>
            <Text style={styles.secondaryText}> Le enviaremos un codigo de 6 digitos para continuar
              con su recuperacion de contraseña</Text>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <ButtonCustom callback={() => sentCode()} text='Continuar' />
        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create(
  {
    scrollView: {
      backgroundColor: "#fff",
    },
    errorMessage: {
      alignSelf: "center",
      alignContent: "center",
      fontWeight: "bold",
      fontSize: 16,
      marginTop: "2%",
      color: "#FF9494"
    },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      maxWidth: Dimensions.get("window").width,
    }
    ,
    primaryText: {
      marginTop: "30%",
      marginBottom: "4%",
      fontWeight: "600",
      color: "#000000",
      fontSize: 28,
      letterSpacing: 0,
      textAlign: "center"

    },
    secondaryText: {
      justifyContent: "center",
      fontWeight: "600",
      color: "#000000",
      fontSize: 14,
      marginTop: "10%",
      letterSpacing: 0,
      textAlign: "center",
    }

    ,
    imageContainer: {
      marginTop: "15%",
      alignItems: 'center'
    }
    ,
    formContainer: {
      flex: 3,
      paddingLeft: "2%",
      paddingRight: "2%",
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginBottom: "8%"
    }
    ,
    inputContainer: {

      flex: .5,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    formContainerItem: {
      flex: .5,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    buttonContainer: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: "10%",
      marginTop: "20%",
      marginBottom: "13%",
      flex: .5,

    }
    ,
    button: {

      width: "100%"
    }
  }
)
export default InsertMail