import { Text, View,StyleSheet,Image,ScrollView } from 'react-native'
import React, { Component } from 'react'
import { InputTasty } from '../shared-components/InputTasty'
import { ButtonCustom } from '../shared-components/ButtonCustom'

export const InsertMail = ({navigation}) =>{
 
      return (
        <ScrollView style={styles.scrollView}>

          <View style = {styles.container}>
            <View style = {styles.imageContainer}>
              <Image source={require('../assets/icons/email-icon.png')} style = {styles.image}/>
            </View>
            
            <View style = {styles.formContainer}>
              <View style = {styles.formContainerItem}>
                <Text style = {styles.primaryText}> Ingrese su email </Text>
                <InputTasty  placeholder = 'E.g: cooking@mail.com'/>
              </View>
              <View style = {styles.formContainerItem}>
                <Text style = {styles.secondaryText}> Le enviaremos un codigo de 6 digitos para continuar
                con su recuperacion de contraseña</Text>
              </View>
            </View>
            <View style = {styles.buttonContainer}>
              <ButtonCustom navigation={navigation} screen='InsertCode' text = 'Continuar'/> 
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
      marginTop:"40%",
      marginBottom:"5%",
      flex:.5,
      flexDirection: 'column',
      justifyContent: 'flex-start',
  }
      ,
      button:{
        
          width: "100%"
      }
  }
)
export default InsertMail