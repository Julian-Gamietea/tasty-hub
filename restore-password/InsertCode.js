import CodeInput from 'react-native-confirmation-code-input';
import { View, StyleSheet, Text,Image } from "react-native"
import React from 'react'
import { ButtonCustom } from '../shared-components/ButtonCustom';

export const InsertCode = ({navigation}) =>{
        return ( 
        <View style={styles.container}>
                <View style = {styles.imageContainer}>
                    <Image source={require('../assets/restore-password/encrypted-code.png')} style = {styles.image}/>
                </View>
            <View style={styles.formContainer} >
                <View style={styles.formContainerItem}>
                    <Text style ={styles.primaryText}> Ingrese los 6 digitos</Text>
                    <CodeInput 
                            activeColor='rgba(243, 162, 0, 1)'
                            inactiveColor='rgba(243, 162, 0, 1)'
                            secureTextEntry
                            keyboardType="numeric"
                            codeLength={6}    
                            className='border-circle'
                            size={40}
                            compareWithCode='123456'
                            autoFocus={true}
                            onFulfill={(isValid) => true}
                            codeInputStyle={{ fontWeight: '800',borderWidth: 1.5 }}
                            containerStyle={{ marginTop: 30 }}/>
                </View>
                    <View style={styles.button}>
                        <ButtonCustom navigation={navigation} screen='InsertNewPassword' text = 'Continuar'/>
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
          // whiteSpace: "pre-wrap",
          // wordWrap: "break-word",
          // wordBreak: "break-word",
           fontWeight: "600",
            color: "#000000",
            fontSize: 28,
            letterSpacing: 0,
          //  lineHeight: 1.2,
           textAlign: "center"
  
        },
        secondaryText:{
          width:"92%",
          //whiteSpace: "pre-wrap",
          //wordWrap: "break-word",
          //wordBreak: "break-word",
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
          zIndex:2,
          flex:.5,
          flexDirection: 'column',
          justifyContent: 'flex-start',
      }
        ,
        button:{
            flex: 1,
            justifyContent: 'flex-end'
        }
    }
  )