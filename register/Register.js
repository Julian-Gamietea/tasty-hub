import { View, StyleSheet, Text, ScrollView} from "react-native"
import {useFonts} from 'expo-font'
import * as React from 'react';
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { RadioButton } from 'react-native-paper';

export const Register = ({navigation}) => {

    const [checked, setChecked] = React.useState('first');
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
                        PASO 1/4
                    </Text>
                    <Text style = {styles.text}>
                        Ingrese sus
                    </Text>
                    <Text style = {styles.text}>
                        datos
                    </Text>
                </View>
                <View style = {styles.formContainer}>

                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Email </Text>
                        <InputTasty 
                            placeholder = 'E.g: cooking@mail.com'
                        />
                    </View>

                    <View style = {styles.formContainerItem}>
                        <Text style = {styles.text}> Alias </Text>
                        <InputTasty 
                            placeholder = 'E.g: Cooking'
                        />
                    </View >

                    <View style = {styles.formContainerItemRadio}>
                        <View style = {{flex: 2, marginTop:6}}>
                            <Text style = {styles.text}> Rol </Text>
                        </View>
                        <View style = {{flex: 3}}>
                            <View style = {styles.formContainerItemRadioHalf}>
                                <View style = {styles.formContainerItemRadioOption}>
                                    <RadioButton
                                        value="first"
                                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked('first')}
                                    
                                    /> 
                                    <Text style = {styles.textSmall}> Alumno </Text>
                                </View>
                                <View style = {styles.formContainerItemRadioOption} >
                                    <RadioButton
                                        value="second"
                                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked('second')}
                                    />
                                     <Text style = {styles.textSmall}> Invitado </Text>  
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>

                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom  text = 'Continuar'/>
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
        textContainer:{
            flex:1,
            marginTop: 70,
            alignItems: 'center'
        }
        ,
        formContainer:{
            flex:3,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 40
        }
        ,
        formContainerItem:{
            flex:.55,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
        ,
        formContainerItem2:{
            flex:.5,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 60,
            marginHorizontal: 15
        }
        ,
        button:{
            width: 20
        }
        ,
        formContainerItemRadio:{
            flex:.55,
            flexDirection: 'column'
        }
        ,
        formContainerItemRadioHalf:{
            flex:1,
            flexDirection:'row',
            justifyContent: 'center',
        }
        ,
        formContainerItemRadioOption:{
            flex:1,
            flexDirection:'row',
            justifyContent: 'center',
            alignItems:'center'
            
        }
        ,
        textSmall:{
            fontFamily: "InterRegular",
            fontSize: 16,
          
        }
    }
)