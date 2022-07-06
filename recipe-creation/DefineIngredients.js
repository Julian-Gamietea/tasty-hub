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
import axios from "axios";

export const DefineIngredients = ({ navigation, route }) => {
    const { state } = route.params;
    const { origin } = route.params;
    const [ingredientQty, setIngredientQty] = React.useState(state.ingredientQty.length > 0 ? state.ingredientQty : []);
    const [ingredients, setIngredients] = React.useState([]);
    const [units, setUnits] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const ing = await axios.get(`https://tasty-hub.herokuapp.com/api/ingredient`);
            setIngredients(ing.data);
            setSearchResults(ing.data);
            const uni = await axios.get(`https://tasty-hub.herokuapp.com/api/unit`);
            setUnits(uni.data);
        }
        fetchData();
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

    const handleChangeQty = (value, index) => {
        const aux = ingredientQty.slice(0, ingredientQty.length);
        aux[index].quantity = value;
        setIngredientQty(aux);
    }

    const handleChangeUnit = (value, index) => {
        const aux = ingredientQty.slice(0, ingredientQty.length);
        aux[index].unitId = value;
        aux[index].unitName = units[value - 1].shortened;
        setIngredientQty(aux);
    }

    const handlePress = () => {
        state.ingredientQty = ingredientQty;
        navigation.navigate(origin, { state: state });
    }

    return (
        <View style={styles.mainContainer}>
            <CustomNav text={"Agregar Ingrediente"} callback={() => navigation.goBack()} />
            <Text style={{ marginTop: 10, textAlign: 'center', fontFamily: 'InterSemiBold' }}>Busque aquí los ingredientes que desee agregar</Text>
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
                                                        observations: "",
                                                        unitName: 'gr'
                                                    });
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
                                            style={{ textAlign: 'center', minWidth: 70, maxWidth: 70, paddingHorizontal: 20, marginRight: 10, paddingVertical: 0, borderColor: '#000' }}
                                            value={ingredient.quantity.toString()}
                                            onChange={(value) => handleChangeQty(value, index)}
                                        />
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                style={styles.picker}
                                                selectedValue={ingredient.unitId}
                                                onValueChange={(itemValue) => handleChangeUnit(itemValue, index)}>
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
        height: Dimensions.get("screen").height * 0.4,
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