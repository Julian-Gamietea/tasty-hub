import { Text, View,StyleSheet,Image,ScrollView } from 'react-native'
import React, { Component } from 'react'
import { InputTasty } from '../shared-components/InputTasty'
import { ButtonCustom } from '../shared-components/ButtonCustom'
import axios from 'axios';
import validateEmail from '../validations/validateEmail';

export const InsertMail = ({navigation}) =>{
  const [status, setStatus] = React.useState("");
  const [inputMail, setMail] = React.useState({mail: ''})
  const handleChange = (text, mail) => {
    setMail({
        ...inputMail,
        [mail] : text
    });
}
const sentCode = async () => {
  if(validateEmail(inputMail.mail)){
    await axios.get('https://tasty-hub.herokuapp.com/api/auth/token?email='+inputMail.mail)
    .then(()=>{
        navigation.navigate('InsertCode',{mail: inputMail.mail})
    })
    .catch( (e)=>{
      if (e.response.status == 422) {
        setStatus("Ya se a generado un token para el mail ingresado")
        navigation.navigate('InsertCode',{mail: inputMail.mail})
      }
      if(e.response.status == 404){
        setStatus("El mail ingresado no se encuentra registrado")
      }
      })
  
  }
  else{
    setStatus("El mail ingresado no es valido")
  }
}


      
  return (
        <ScrollView style={styles.scrollView}>

          <View style = {styles.container}>
            <View style = {styles.imageContainer}>
              <Image source={require('../assets/icons/email-icon.png')} style = {styles.image}/>
            </View>
            
            <View style = {styles.formContainer}>
              <View style = {styles.formContainerItem}>
                <Text style = {styles.primaryText}> Ingrese su email </Text>
                <InputTasty onChange={(text) => handleChange(text, 'mail')}
                            value={inputMail.mail}
                            placeholder = 'E.g: cooking@mail.com'/>
                             
                <Text style={styles.errorMessage}>{status}</Text>
                
              </View>
              <View style = {styles.formContainerItem}>
                <Text style = {styles.secondaryText}> Le enviaremos un codigo de 6 digitos para continuar
                con su recuperacion de contraseña</Text>
              </View>
            </View>

            <View style = {styles.buttonContainer}>
              <ButtonCustom callback={() => sentCode()} text = 'Continuar'/> 
            </View>
            
          </View>

        </ScrollView>
      )
  }

const styles = StyleSheet.create(
  {
      image:{
          marginTop:"15%",
          width:"60%"
      },
      errorMessage:{
        alignSelf:"center",
        alignContent:"center",
        fontWeight:"900",
        fontSize:16,
        marginTop:"2%",
        fontStyle:'bold',
        color:"#FF9494"
      },
  
      container:{
          flex:1,
          justifyContent:"center",
          alignContent:"center",
          flexDirection:"column",
          backgroundColor: '#fff',
          alignItems: 'stretch'
      }
      ,
      primaryText:{
        marginTop:"30%",
        marginBottom:"4%",
         fontWeight: "600",
          color: "#000000",
          fontSize: 28,
          letterSpacing: 0,
        //  lineHeight: 1.2,
         textAlign: "center"

      },
      secondaryText:{
        width:"92%",

        fontWeight: "600",
        color: "#000000",
        fontSize: 14,
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
      formContainer:{
          flex:3,
          paddingLeft: "2%",
          paddingRight: "2%",
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginBottom: "8%"
      }
      ,
      inputContainer:{
          
          flex:.5,
          flexDirection: 'column',
          justifyContent: 'flex-start',
      },
      formContainerItem:{
        flex:.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    buttonContainer:{
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: "10%",
      marginTop:"20%",
      marginBottom:"15%",
      flex:.5,

     
  }
      ,
      button:{
        
          width: "100%"
      }
  }
)
export default InsertMail