import React from "react"
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { CustomNav } from "../shared-components/CustomNav";

export const RecipeNameExists = ({navigation, route}) => {
    const {recipeName} = route.params;
    return (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
            <View style={{alignSelf: 'flex-start'}}>
                <CustomNav callback={() => navigation.goBack()}/>
            </View>
            <Text style={{fontFamily: "InterBold", fontSize: 40, color: "#553900", textAlign: 'center'}}>¡Atención!</Text>
            <View style={{backgroundColor: '#F3A200', borderRadius: 500, padding: 30, marginBottom: 30}}>
                <MaterialIcons name="warning" size={150} color="white" />
            </View>
            <Text style={styles.text}>Ya ha publicado una receta con el nombre "{recipeName}".</Text>
            <Text style={styles.text}>¿Desea sobrescribir su contenido o editar la receta?</Text>
            <View style={{ marginTop: 60,flexDirection: 'row', justifyContent: 'space-around', width: Dimensions.get("screen").width}}>
                <ButtonCustom 
                text={'Editar'} 
                style={[styles.btn, {marginLeft: 25}]}
                callback={() => navigation.navigate('RecipeForm', {type: 'edit', recipe: route.params.recipe})}
                />
                <ButtonCustom 
                text={'Sobrescribir'} 
                style={[styles.btn, {marginRight: 25}]}
                callback={() => navigation.navigate("RecipeForm", {type: 'overwrite', recipeTitle: recipeName})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#553900",
        fontFamily: 'InterRegular',
        fontSize: 18,
        textAlign: 'left',
        marginVertical: 10,
        marginHorizontal: 20
    },
    btn: {
        width: Dimensions.get("screen").width * .4,
        paddingVertical: 20,
        borderRadius: 5,
        elevation: 0
    }
})