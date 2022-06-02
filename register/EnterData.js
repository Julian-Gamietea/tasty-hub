import { View, StyleSheet, Text, ScrollView} from "react-native"
import {useFonts} from 'expo-font'
import * as React from 'react';
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const EnterData = ({navigation}) => {
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf')
    });
    if(!loaded){
        return null;
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
                        />
                    </View>

                    <View style = {styles.formContainerItem}>
                        <View style = {styles.textLine}>
                            <Text style = {styles.text3}> Contraseña</Text>
                            <Text style = {styles.asterisk}> *</Text>
                        </View>
                        
                        <InputTasty 
                            placeholder = 'Ingrese aqui'
                        />
                    </View >

                    <View style = {styles.formContainerItem}>
                        <View style = {styles.textLine}>
                            <Text style = {styles.text3}> Reingrese contraseña</Text>
                            <Text style = {styles.asterisk}> *</Text>
                        </View>
                        
                        <InputTasty 
                            placeholder = 'Ingrese aqui'
                        />
                    </View >   
                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom 
                        callback={() => navigation.navigate('EnterAvatar')}
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