import { View, StyleSheet, Text,Image, Dimensions } from "react-native"
import React from 'react'
import { ButtonCustom } from '../shared-components/ButtonCustom';
import axios from 'axios';
import CodeInput from "react-native-confirmation-code-input";

export const InsertCode = ({navigation,route}) =>{
    const [status, setStatus] = React.useState("");
    var email = route.params.mail;
    const [code,setCode] = React.useState("");
    const validateCode =  () => {
         axios.get(`https://tasty-hub.herokuapp.com/api/auth/check/${parseInt(code)}?email=${email}`)
        .then(()=>{
            navigation.navigate('InsertNewPassword',{userEmail:route.params.mail})
        })
        .catch( (e)=>{
            setStatus("El código ingresado no coincede con el enviado a su mail.Por favor reingresar")
        })
      }
    console.log(status)
    return ( 
        <View style={styles.container}>
                <View style = {styles.imageContainer}>
                    <Image source={require('../assets/restore-password/encrypted-code.png')} style = {styles.image}/>
                    <Text style ={styles.primaryText}> Ingrese los 6 digitos</Text>

                </View>
            <View style={styles.formContainer} >
                <View style={styles.formContainerItem}>
                    <CodeInput 
                            activeColor='rgba(243, 162, 0, 1)'
                            inactiveColor='rgba(243, 162, 0, 1)'
                            keyboardType="numeric"
                            codeLength={6}    
                            className='border-circle'
                            size={40}
                            autoFocus={true}
                            onFulfill={(code)=>setCode(code)}
                            editable={true}
                            clearButtonMode='never'
                            codeInputStyle={{ fontWeight: '800',borderWidth: 1.5 }}
                            containerStyle={{ marginTop: 30 }}/>
                            
                    <Text style={styles.errorMessage}>{status}</Text>
                </View>
                    <View style={styles.button}>
                        <ButtonCustom callback={() => validateCode()} text = 'Continuar'/>
                    </View>
            </View>
        </View>)
      }

const styles = StyleSheet.create(
    {
        image:{
            marginTop:"15%",
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
          textAlign: "center"
  
        },
        secondaryText:{
          width:"92%",
          fontWeight: "600",
          fontFamily: "InterSemiBold",
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
          flex:.6,
          flexDirection: 'column',
          justifyContent: 'flex-start',
      }
        ,
        button:{
            marginHorizontal: "10%",
            flex: 1,
            justifyContent: 'flex-end'
        },
        errorMessage:{
            alignSelf:"center",
            alignContent:"center",
            fontWeight:"900",
            fontSize:16,
            marginTop:"15%",
            fontStyle:'italic',
            color:"#FF9494",
            width:Dimensions.get("screen").width-100
          },
    }
)

export default InsertCode