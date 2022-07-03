import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { RecipeDashboardCard } from '../shared-components/RecipeDashboardCard';
import { Feather } from '@expo/vector-icons';
import { DashboardInput } from '../dashboard/DashboardInput';

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';



export const SearchResults = ({ route, navigation }) => {
    const recipesFilter = route.params.recipeList
    console.log(recipesFilter)
    const { query } = route.params;
    const { type } = route.params;

    const [user, setUser] = React.useState(null);
    const [recipeList, setRecipeList] = React.useState([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(type);
    const [inputValue, setInputValue] = React.useState(query);
    const [isFetching, setIsFetching] = React.useState(false);
    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            setUser(JSON.parse(userData));
        }
        fetchUserData();
    }, [])

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    }

    const fetchData = async () => {
            try {
                let res;
                if (selectedValue === 'plato') {
                    res = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/like?name=${inputValue}`);
                } else {
                    res = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/username/like?username=${inputValue}`)
                }
                setRecipeList(res.data.slice(0, res.data.length));
                setDataLoaded(true);
                setIsFetching(false);
            } catch (error) {
                console.log(error);
            }
    
    }

    React.useEffect(() => {
        fetchData();
    
    }, [user])


    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });
    if (!loaded || !dataLoaded) {
        return null;
    }
    
    return (

        <KeyboardAvoidingView style={{ ...styles.mainContainer, paddingTop: StatusBar.currentHeight + 15 }} >
            <StatusBar backgroundColor={"#fff"} />
            <View style={styles.ddcontainer}>
                <Text>Buscar por </Text>
                <View style={styles.pickerContainer}>
                    <Picker style={styles.picker}
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    >
                        <Picker.Item style={styles.item} label='Plato' value='plato' />
                        <Picker.Item style={styles.item} label='Usuario' value='usuario' />
                    </Picker>
                </View>

            </View>
            <View style={styles.inputContainer}>
                <DashboardInput
                    onChange={(value) => setInputValue(value)}
                    value={inputValue}
                    onClick={() => fetchData()}
                    placeholder={selectedValue === 'plato' ? "Buscar por plato..." : "Buscar por usuario..."}
                />
            </View>
            <View style={styles.filtersContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Filtrar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="filter" size={32} color="#553900" />
                </TouchableOpacity>
            </View>

            <StatusBar style='dark' />
            <Text style={styles.text}>Resultados de búsqueda</Text>
            {recipeList.length > 0 && <FlatList
                onRefresh={onRefresh}
                refreshing={isFetching}
                data={recipeList}
                style={{ ...styles.recipesContainer }}
                nestedScrollEnabled={true}
                key={item => item.id}
                renderItem={(recipe) => {
                    const elem = recipe.item;
                    return (<RecipeDashboardCard
                        key={elem.id}
                        onPress={() => navigation.navigate('Recipe', { id: elem.id, userId: user.id })}
                        id={elem.id}
                        title={elem.name}
                        author={elem.ownerUserName}
                        image={elem.mainPhoto}
                        shortDescription={elem.description}
                        timeToMake={elem.duration}
                        userId={user.id}
                        isFav={isFetching}
                    />);
                }}
            />
            }
            {recipesFilter && <FlatList
                onRefresh={onRefresh}
                refreshing={isFetching}
                data={recipesFilter}
                style={{ ...styles.recipesContainer }}
                nestedScrollEnabled={true}
                key={item => item.id}
                renderItem={(recipe) => {
                    const elem = recipe.item;
                    return (<RecipeDashboardCard
                        key={elem.id}
                        onPress={() => navigation.navigate('Recipe', { id: elem.id, userId: user.id })}
                        id={elem.id}
                        title={elem.name}
                        author={elem.ownerUserName}
                        image={elem.mainPhoto}
                        shortDescription={elem.description}
                        timeToMake={elem.duration}
                        userId={user.id}
                        isFav={isFetching}
                    />);
                }}
            />
            }
             {recipesFilter.length === 0  &&
                <FlatList
                    data={[{}]}
                    renderItem={() => (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 40, marginTop: 40}}>
                            <Text style={{ textAlign: 'center', fontFamily: "InterRegular", fontSize: 20 }}>Lo sentimos, no tenemos lo que estas buscando...</Text>
                            <MaterialCommunityIcons name="cookie-alert-outline" size={150} color="#e8e8e8" />
                        </View>
                    )}
                >
                    
                </FlatList>}
            {recipeList.length === 0 && !recipesFilter &&
                <FlatList
                    data={[{}]}
                    renderItem={() => (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 40, marginTop: 40}}>
                            <Text style={{ textAlign: 'center', fontFamily: "InterRegular", fontSize: 20 }}>Lo sentimos, no tenemos lo que estas buscando...</Text>
                            <MaterialCommunityIcons name="cookie-alert-outline" size={150} color="#e8e8e8" />
                        </View>
                    )}
                >
                    
                </FlatList>}
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },
    recipesContainer: {
        flex: 1,
    },
    text: {
        fontSize: 28,
        marginBottom: 30,
        marginLeft: 30,
        fontFamily: "InterSemiBold"
    },
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        maxHeight: 50,
        maxWidth: 350,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20
    },
    filterButton: {
        backgroundColor: "#F7EAB5",
        minWidth: 230,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    filterText: {
        fontFamily: "InterSemiBold",
        fontSize: 16
    },
    welcomeMessage: {
        fontFamily: "InterRegular",
        fontSize: 18,
        marginLeft: 30,
        marginBottom: 30,
        marginTop: 5
    },
    username: {
        fontFamily: "InterSemiBold"
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 20
    },
    ddcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: '48%',
    },
    dropdown: {
        backgroundColor: "#F7EAB5",
        maxWidth: 107,
        maxHeight: 41,
        borderRadius: 10,
    },
    dropdownText: {
        fontFamily: "InterSemiBold",
        color: "#553900",
        fontSize: 14
    },
    rows: {
        backgroundColor: "#F7EAB5",
    },
    picker: {
        width: 120,
        color: '#553900',
        fontFamily: "InterSemiBold",
        justifyContent: 'center',
    },
    pickerContainer: {
        flex: 1,
        minWidth: 115,
        maxHeight: 50,
        borderRadius: 10,
        backgroundColor: '#F7EAB5',
        marginLeft: 5
    }
})