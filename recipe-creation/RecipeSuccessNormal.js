import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const RecipeSuccessNormal = ({ navigation, route }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <View style={{backgroundColor: '#F3A200', borderRadius: 500, padding: 20}}>
                <MaterialIcons name="done" size={150} color="white" />
            </View>
            <Text style={{color: "#553900", fontFamily: 'InterRegular', fontSize: 35, marginTop: 50}}>¡Receta completada!</Text>
            <Text style={{color: "#553900", fontFamily: 'InterRegular', fontSize: 18, textAlign: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 200}}>Recibirás un correo electrónico cuando tu receta esté publicada</Text>
            <ButtonCustom text={"Continuar"} callback={() => navigation.navigate('WelcomeScreen')} style={{elevation: 0, borderRadius: 5, paddingHorizontal: 60}}/>
        </View>
    )
}