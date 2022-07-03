import React from 'react';
import { View, Text, StyleSheet,ScrollView, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { CustomNav } from '../shared-components/CustomNav';
import { MaterialIcons } from '@expo/vector-icons';


export const DefineType = ({ navigation, route }) => {
    const recipe = route.params.state;

    const [checked, setChecked] = React.useState({
        typeId: recipe.typeId,
        description: recipe.typeDescription
    });


    const handlePress =  () => {
        recipe.typeId = checked.typeId;
        recipe.typeDescription = checked.description;
        console.log(recipe);
        navigation.navigate('RecipeForm', {state: recipe})
    }

    const types = [
        {
            "id": 7,
            "description": "Americana"
        },
        {
            "id": 12,
            "description": "Aperitivo"
        },
        {
            "id": 9,
            "description": "Argentina"
        },
        {
            "id": 4,
            "description": "China"
        },
        {
            "id": 26,
            "description": "Dulces"
        },
        {
            "id": 8,
            "description": "Española"
        },
        {
            "id": 18,
            "description": "Francesa"
        },
        {
            "id": 20,
            "description": "Hamburguesa"
        },
        {
            "id": 16,
            "description": "India"
        },
        {
            "id": 5,
            "description": "Italiana"
        },
        {
            "id": 13,
            "description": "Japonesa"
        },
        {
            "id": 2,
            "description": "Mexicana"
        },
        {
            "id": 27,
            "description": "Panadería"
        },
        {
            "id": 14,
            "description": "Pasta"
        },
        {
            "id": 15,
            "description": "Peruana"
        },
        {
            "id": 19,
            "description": "Pizza"
        },
        {
            "id": 11,
            "description": "Postre"
        },
        {
            "id": 1,
            "description": "Rapida"
        },
        {
            "id": 10,
            "description": "Saludable"
        },
        {
            "id": 6,
            "description": "Suiza"
        },
        {
            "id": 28,
            "description": "Turca"
        },
        {
            "id": 3,
            "description": "Vegetariana"
        }
    ]
    return (
        <View style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center', paddingTop: StatusBar.currentHeight + 5}}>
            <CustomNav text={"Definir Tipo"} callback={() => {navigation.goBack()}}/>
                <ScrollView style={{ backgroundColor: '#fff'}}>
                <View style={{marginTop: 30 ,alignItems: 'flex-start', alignSelf: 'center'}}>
                    <Text style={styles.mainText}>Seleccione la categoría a la que corresponde su plato. </Text>
                    <Text style={styles.mainText}>Tenga en cuenta que podrá seleccionar una única categoría.</Text>
                </View>
                <View style={{marginLeft: 20, marginTop: 50 ,alignSelf: 'center' ,flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {types.map((type, index) => {
                        return (
                            <View key={index} style={styles.formContainerItemRadioOption}>
                                <RadioButton
                                    value={type.id}
                                    status={checked.typeId === type.id ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked({ typeId: type.id, description: type.description})}
                                    color={"#0099FF"}
                                />
                                <Text style={styles.textSmall}>{type.description}</Text>
                            </View>
                        )
                    })}
                </View>
                <TouchableOpacity 
                style={{alignSelf: 'center' ,backgroundColor: "#583209", borderRadius: 500, padding: 10, marginTop: 30, marginBottom: 20 }}
                onPress={handlePress}
                >
						<MaterialIcons name="chevron-right" size={70} color="#fff" />
				</TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainerItemRadioOption: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get("screen").width * 0.4

    },
    textSmall: {
        fontFamily: "InterRegular",
        fontSize: 16,

    },
    mainText: {
        fontFamily: "InterSemiBold",
        fontSize: 16,
        marginHorizontal: 20,
        marginBottom: 10
    }
})