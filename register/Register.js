import { View, StyleSheet, Text, RadioButton } from "react-native"
import {useFonts} from 'expo-font'
import { InputTasty } from "../shared-components/InputTasty";
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const Register = () => {
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf')
    });
    if(!loaded){
        return null;
    }

    const data = [
        {
          label: 'data 1',
          accessibilityLabel: 'Your label'
         },
         {
          label: 'data 2',
          accessibilityLabel: 'Your label'
         }
        ];

    return (
        <View style = {styles.container}>
            <View style = {styles.textContainer}>
                <Text style = {styles.text}>
                    PASO 1/4
                </Text>
                <Text style = {styles.text}>
                    Ingrese sus datos
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
               
                <View style = {styles.formContainerItem}>
                    <ButtonCustom text = 'Continuar'/>
                </View>
            
            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'stretch'
        }
        ,
        text:{
            fontFamily: "InterSemiBold",
            fontSize: 30,
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
            flex:.5,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
        ,
        button:{
            width: 20
        }
    }
)