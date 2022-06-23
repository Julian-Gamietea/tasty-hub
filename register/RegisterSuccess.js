import { View, Text ,Image, StyleSheet } from "react-native";
import ok from '../assets/register/ok.png'
import {useFonts} from 'expo-font'
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { NavigationHelpersContext } from "@react-navigation/native";

export const RegisterSuccess = ({navigation}) => {

    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf')
    });
    if(!loaded){
        return null;
    }

    return(
        <View style = {styles.container}>
            <Image style = {styles.image} source = {ok} />
            <Text style = {styles.text}>  El registro fue {'\n'} realizado con éxito.</Text>
            <Text style = {styles.text2}>  ¡Bienvenido a Tasty {'\n'} Hub!</Text>
            <View style = {styles.button}>
                <ButtonCustom callback={()=>navigation.navigate("Login")} text = 'Iniciar Sesion'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    },
    image:{
        marginTop: 150,
        height: 200,
        width: 220,
        marginRight: 22.5
    },
    text:{
        marginTop: 40,
        fontFamily: 'InterLight',
        textAlign: 'center',
        fontSize: 32
    },
    text2:{
        fontFamily: 'InterLight',
        textAlign: 'center',
        fontSize: 32
    },
    button:{
        flex: 1,
        marginTop: 80,
        width: 300
    }
})