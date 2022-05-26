
import { View, StyleSheet, Text, RadioButton,Image,ScrollView } from "react-native"
import React, { Component } from 'react'
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";

export class InsertNewPassword extends Component {
    render() {
        return (
            <ScrollView style={styles.scrollView}>
          <View style = {styles.container}>
            <View style = {styles.imageContainer}>
            <Text style={styles.secondaryText}>Ultimo Paso!</Text>
              <Image source={require('../assets/restore-password/last-step-password-recovery.png')} style = {styles.image}/>
            </View>
            
            <View style = {styles.mailFormContainer}>
              <View>
                <Text style = {styles.primaryText}> Nueva contraseña</Text>
                <InputTasty  placeholder = 'Ingrese aqui'/>
              </View>
              <View>
                <Text style = {styles.primaryText}> Reingrese contraseña </Text>
                <InputTasty  placeholder = 'Ingrese aqui'/>
              </View>
            </View>
            <View style={styles.buttonContainer}>
                    <ButtonCustom text = 'Continuar'/>
            </View>
        </View>

        </ScrollView>
        )
      }
    }
    const styles = StyleSheet.create(
      {
          image:{      
              marginTop:"5%"        
          },
          buttonContainer:{
              flex:1,
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
            marginTop:"20%",
            marginBottom:"4%",
             fontWeight: "600",
              color: "#000000",
              fontSize: 28,
              letterSpacing: 0,
              alignContent:"flex-start",
            //  lineHeight: 1.2,
             textAlign: "left"
    
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
          mailFormContainer:{
              flex:3,
              paddingLeft: "2%",
              paddingRight: "2%",
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginBottom: "8%"
          }
          
          
      }
    )