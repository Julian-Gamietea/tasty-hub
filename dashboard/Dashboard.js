import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { RecipeDashboardCard } from '../shared-components/RecipeDashboardCard';
import { Feather } from '@expo/vector-icons';
import { DashboardInput } from './DashboardInput';
import { Dropdown } from './Dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';


export const Dashboard = ({ route, navigation }) => {
    const user = route.params;

    const [recipeList, setRecipeList] = React.useState([]);
    const [favouriteRecipes, setFavouriteRecipes] = React.useState([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('plato');
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://tasty-hub.herokuapp.com/api/recipes");
                setRecipeList(res.data.slice(0, 5));
                const fres = await axios.get(`https://tasty-hub.herokuapp.com/api/favorite/${user.id}`);
                setFavouriteRecipes(fres.data.map(x => x));
                setDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const checkFavouriteRecipe = (id) => {
        for (const recipe of favouriteRecipes) {
            if (recipe.recipeId === id) {
                return true;
            }
        }
        return false;
    }

    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });

    if (!loaded || !dataLoaded) {
        return null;
    }

    return (
        

            <ScrollView style={styles.mainContainer} nestedScrollEnabled={true}>
                <Text style={styles.welcomeMessage}>¡Bienvenido de nuevo, <Text style={styles.username}>{user.name.split(" ")[0]}</Text>!</Text>
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
                        onClick={() => console.log("searched")}
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
                <Text style={styles.text}>Recomendados</Text>
                <StatusBar style='dark' />
                <ScrollView style={styles.recipesContainer} nestedScrollEnabled={true}>
                    {recipeList.map((elem, index) => {
                        return (<RecipeDashboardCard
                            key={index}
                            id={elem.id}
                            title={elem.name}
                            author={elem.ownerUserName}
                            image={elem.mainPhoto}
                            shortDescription={elem.description}
                            timeToMake={elem.duration}
                            userId={user.id}
                            isFav={checkFavouriteRecipe(elem.id)}
                        />);
                    })}
                </ScrollView>
            </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: '9%'
    },
    mainContainer: {
        flex: 1,
        paddingTop: '9%',
        backgroundColor: '#fff'
    },
    recipesContainer: {
        flex: 1,
        maxHeight: "40%",
    },
    text: {
        fontSize: 30,
        marginBottom: 40,
        marginLeft: 30,
        fontFamily: "InterSemiBold"
    },
    filtersContainer: {
        flex: 1,
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
        marginRight: '48%'
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