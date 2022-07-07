import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'
import { ButtonCustom } from "../shared-components/ButtonCustom";

export const RecipeEditSuccess = ({ navigation, route }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <View style={{backgroundColor: '#F3A200', borderRadius: 500, padding: 20}}>
                <MaterialIcons name="done" size={150} color="white" />
            </View>
            <Text style={{color: "#553900", fontFamily: 'InterRegular', fontSize: 35, marginTop: 50, marginBottom: 200}}>¡Receta Actualizada!</Text>
            <ButtonCustom text={"Continuar"} callback={() => navigation.navigate('WelcomeScreen')} style={{elevation: 0, borderRadius: 5, paddingHorizontal: 60}}/>
        </View>
    )
}