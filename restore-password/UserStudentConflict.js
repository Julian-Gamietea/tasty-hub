import { View, Text ,Image, StyleSheet } from "react-native";
import warning from '../assets/register/incomplete-warning.png';
import {useFonts} from 'expo-font'
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const UserStudentConflict = ({navigation}) => {

    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf')
    });
    if(!loaded){
        return null;
    }

    return(
        <View style = {styles.container}>
            <Text style={styles.title}>¡Atencion!</Text>
            <Image style = {styles.image} source = {warning} />

            <View style={styles.textContainer}>
                <Text style = {styles.text}>  Solo los invitados pueden{'\n'} cambiar su contraseña</Text>
                <Text style = {styles.text}>  Usted esta registrado {'\n'}como alumno</Text>
            </View>
            <View style = {styles.button}>
                <ButtonCustom callback={()=>navigation.navigate("Login")} text = 'Aceptar'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        fontSize:40,
        justifyContent:"flex-start",
        alignContent:"center",
        marginTop:"15%"
    },
    container:{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    },
    image:{
        marginTop: "20%",
        height: 150,
        width: 200,
        justifyContent:"center",
        alignContent:"center"
        
    },
    textContainer:{
        marginTop:"15%"
    },
    text:{
        marginTop: 40,
        fontFamily: 'InterLight',
        textAlign: 'center',
        fontWeight:"600",
        fontSize: 26
    },
    text2:{
        fontFamily: 'InterLight',
        textAlign: 'center',
        fontStyle:"bold",
        fontSize: 32
    },
    button:{
        flex: 1,
        marginTop: 80,
        width: 300
    }
})