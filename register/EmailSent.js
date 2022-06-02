import { View,Image, StyleSheet, Text } from "react-native";
import image from "../assets/register/email.png"
import {useFonts} from 'expo-font'
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const EmailSent = ({route, navigation}) =>{
    const Stack = createNativeStackNavigator();
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf')
    });
    if(!loaded){
        return null;
    }

    const {mail} = route.params;
    
    return(
        <View style = {styles.container}>
            <View style = {styles.textContainer}>
                <Text style = {styles.text}> PASO 2/4</Text>
            </View>
            <View style = {styles.textContainer}>
                <Text style = {styles.text2}> Un correo electrónico {'\n'} fue enviado a </Text>
                <Text style = {styles.text3}> {mail} </Text>
            </View>
            <Image style = {{flex: 2, height: 150, width: 200}}source={image}></Image>
            <View>
                <Text style = {styles.text4}> Ingrese a su correo {'\n'} electrónico (no cierre la {'\n'} aplicación) </Text>
            </View>
            <View style = {styles.button}>
                <ButtonCustom 
                callback={() => navigation.navigate('EnterData')}
                text = 'Ya verifiqué mi correo'/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:"center",
    },
    text:{
        marginTop: 50,
        padding: 18,
        fontFamily: "InterSemiBold",
        textAlign:'center',
        fontSize: 36
    },
    text2:{
        
        fontFamily: "InterSemiBold",
        fontSize: 25,
        textAlign:'center',
    },
    text3:{
      
        fontFamily: "InterLight",
        fontSize: 25,
        textAlign:'center',
    },
    text4:{
        padding: 30,
        fontFamily: "InterLight",
        fontSize: 20,
        textAlign:'center',
    },
    textContainer:{
        flex:1
    },
    button:{
        flex:1,
        width: 320

    }
    
})