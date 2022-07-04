import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { CustomNav } from "../shared-components/CustomNav";
import { Checkbox } from "react-native-paper";
import { InputTasty } from "../shared-components/InputTasty";
import { Picker } from '@react-native-picker/picker';
import { DashboardInput } from "../dashboard/DashboardInput";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const DefineIngredients = ({ navigation, route }) => {
    const {state} = route.params;
    const [ingredientQty, setIngredientQty] = React.useState(state.ingredientQty.length > 0 ? state.ingredientQty : []);
    const [initialLoad, setInitialLoad] = React.useState(null);
    const ingredients = [
        {
            "id": 101,
            "name": "Tomate",
            "dividable": false
        },
        {
            "id": 102,
            "name": "Huevo",
            "dividable": false
        },
        {
            "id": 103,
            "name": "Pollo",
            "dividable": false
        },
        {
            "id": 104,
            "name": "Choclo",
            "dividable": false
        },
        {
            "id": 105,
            "name": "Remolacha",
            "dividable": false
        },
        {
            "id": 106,
            "name": "Palta",
            "dividable": false
        },
        {
            "id": 107,
            "name": "Limon",
            "dividable": false
        },
        {
            "id": 108,
            "name": "Aceite",
            "dividable": false
        },
        {
            "id": 109,
            "name": "Jugo de limon",
            "dividable": false
        },
        {
            "id": 117,
            "name": "Carne",
            "dividable": false
        },
        {
            "id": 118,
            "name": "Pan de papa",
            "dividable": false
        },
        {
            "id": 119,
            "name": "Queso cheddar",
            "dividable": false
        },
        {
            "id": 120,
            "name": "Jamon",
            "dividable": false
        },
        {
            "id": 121,
            "name": "Lechuga",
            "dividable": false
        }
    ];


    const iq =
    {
        ingredientId: 0,
        unitId: 0,
        quantity: 0,
        recipeId: 0,
        observations: "",
    }
    const units = [
        {
            "id": 1,
            "description": "gramos",
            "shortened": "gr"
        },
        {
            "id": 2,
            "description": "onzas",
            "shortened": "oz"
        },
        {
            "id": 3,
            "description": "kilogramos",
            "shortened": "kg"
        },
        {
            "id": 4,
            "description": "libras",
            "shortened": "lb"
        },
        {
            "id": 5,
            "description": "litros",
            "shortened": "lt"
        }
    ]

    const [searchValue, setSearchValue] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    React.useEffect(() => {
        setSearchResults(ingredients);
    }, [])

    const handleSearch = (value) => {
        setSearchValue(value);
        setSearchResults(ingredients.filter((ingredient) => {
            return ingredient.name.toLowerCase().includes(value.toLowerCase());
        }))
    }

    const isInIngredientQty = (id) => {
        for (let ingredient of ingredientQty) {
            if (id === ingredient.ingredientId) {
                return true;
            }
        }
        return false;
    }

    const handleChangeQty = (value,index) => {
        const aux = ingredientQty.slice(0, ingredientQty.length);
        aux[index].quantity = value;
        setIngredientQty(aux);
    }

    const handleChangeUnit = (value, index) => {
        const aux = ingredientQty.slice(0, ingredientQty.length);
        aux[index].unitId = value;
        setIngredientQty(aux);
    }

    const handlePress = () => {
        state.ingredientQty = ingredientQty;
        navigation.navigate("RecipeForm", {state: state});
    }

    return (
        <View style={styles.mainContainer}>
            <CustomNav text={"Agregar Ingrediente"} callback={() => navigation.goBack()} />
            <Text style={{marginTop: 10,textAlign: 'center', fontFamily: 'InterSemiBold'}}>Busque aquí los ingredientes que desee agregar</Text>
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <DashboardInput placeholder={"Busque un ingrediente..."}
                    value={searchValue} onChange={(value) => handleSearch(value)}
                    onClick={() => setSearchValue("")}
                    icon="done"
                    />
            </View>
            {searchValue !== "" ? <Text style={styles.title}>Ingredientes</Text> : <Text style={styles.title}>Ingredientes Agregados</Text>}
            <ScrollView style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'flex-start', marginTop: 30 }}>
                        {/* BUSQUEDA INGREDIENTES */}
                        {searchValue !== "" && searchResults.length !== 0 && searchResults.map((ingredient, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', width: 320, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <Checkbox
                                            color="#0099FF"
                                            status={isInIngredientQty(ingredient.id) ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                if (isInIngredientQty(ingredient.id)) {
                                                    const aux = ingredientQty.filter((elem) => elem.ingredientId !== ingredient.id);
                                                    setIngredientQty(aux);
                                                } else {
                                                    const aux = ingredientQty.slice(0, ingredientQty.length);
                                                    aux.push({ 
                                                        ingredientId: ingredient.id, 
                                                        ingredientName: ingredient.name,
                                                        unitId: 1,
                                                        quantity: 1,
                                                        recipeId: 0,
                                                        observations: "" });
                                                    console.log(aux);
                                                    setIngredientQty(aux);
                                                }
                                            }}
                                        />
                                        <Text style={{ fontFamily: 'InterRegular', fontSize: 16 }}>{ingredient.name}</Text>
                                    </View>
                                </View>
                            )
                        })}
                        {/* MENSAJE SI NO HAY RESULTADOS DE BUSQUEDA */}
                        {searchValue !== "" && searchResults.length === 0 && 
                        <View style={styles.emptyMessage}>
                            <Text style={styles.text}>No tenemos el ingrediente que estas buscando...</Text>
                            <AntDesign name="find" size={80} color="#e8e8e8" />
                        </View>}
                        {/* INGREDIENTES AGREGADOS */}
                        {searchValue === "" && ingredientQty.map((ingredient, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', width: 320, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <Checkbox
                                            color="#0099FF"
                                            status={'checked'}
                                            onPress={() => {
                                                const aux = ingredientQty.filter((elem) => elem.ingredientId !== ingredient.ingredientId);
                                                setIngredientQty(aux);
                                            }}
                                        />
                                        <Text style={{ fontFamily: 'InterRegular', fontSize: 16 }}>{ingredient.ingredientName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <InputTasty
                                            keyboardType={'numeric'}
                                            maxLength={3}
                                            style={{textAlign: 'center', minWidth: 70, maxWidth: 70 ,paddingHorizontal: 20, marginRight: 10, paddingVertical: 0, borderColor: '#000' }}
                                            value={ingredient.quantity}
                                            onChange={(value) => handleChangeQty(value, index)}
                                        />
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                style={styles.picker}
                                                selectedValue={ingredient.unitId}
                                                onValueChange={(itemValue) => handleChangeUnit(itemValue, index) }>
                                                {units.map((unit) => {
                                                    return <Picker.Item label={unit.shortened} value={unit.id} />
                                                })}
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

            </ScrollView>
            <ButtonCustom 
            text={'Aceptar'} 
            style={{ marginHorizontal: 100, marginBottom: 15, marginTop: 10 }}
            callback={handlePress}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: '#fff'
    },
    container: {
        backgroundColor: '#fff'
    },
    picker: {

        color: '#000',
        fontFamily: 'InterSemiBold',
        justifyContent: 'center',
    },
    pickerContainer: {
        borderRadius: 500,
        backgroundColor: '#EBEBEB',
        width: 85,
        borderRadius: 50,
        height: 40,
        justifyContent: 'center',
        marginBottom: 20
    },
    emptyMessage: {
        height: Dimensions.get("screen").height*0.4,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '40%'
    },
    text: {
        color: "#000",
        fontFamily: "InterSemiBold",
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 20
    },
    title: {
        fontFamily: "InterSemiBold",
        fontSize: 20,
        textAlign: 'center'
    }
})