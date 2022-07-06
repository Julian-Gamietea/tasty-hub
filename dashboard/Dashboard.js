import React from 'react';
import { Modal,View, Text, StatusBar, StyleSheet, TouchableOpacity, Dimensions, RefreshControl, SafeAreaView, FlatList, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useFonts } from 'expo-font';
import { RecipeDashboardCard } from '../shared-components/RecipeDashboardCard';
import { Feather } from '@expo/vector-icons';
import { DashboardInput } from './DashboardInput';

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Dashboard = ({ route, navigation }) => {

    const [user, setUser] = React.useState(null);
    const [recipeList, setRecipeList] = React.useState([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('plato');
    const [inputValue, setInputValue] = React.useState("");
    const [isFetching, setIsFetching] = React.useState(false);
    const [isModalVisible,setIsModalVisible]=React.useState(false);
    const [checked, setChecked] = React.useState();

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
            const res = await axios.get("https://tasty-hub.herokuapp.com/api/recipes");
            setRecipeList(res.data.slice(0, 5));
            setDataLoaded(true);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
    }

    const checkFavourite = async (id) => {
        const resf = await axios.get(`https://tasty-hub.herokuapp.com/api/favorite/isfavourite?recipeId=${id}&userId=${user.id}`)
        return resf.data;
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
    const organizeRecipes = () => {
        if(checked=="alfabeticamente"){
            recipeList.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
            });
        }else if(checked=="antiguedad"){
            recipeList.sort((a, b) => {
                return a.id > b.id;
            });
        }else if(checked=="usuario"){
            recipeList.sort((a, b) => {
                let fa = a.ownerUserName.toLowerCase(),
                    fb = b.ownerUserName.toLowerCase();
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
                });

        }
       
        setIsModalVisible(false)
    }
    return (

        <KeyboardAvoidingView style={{...styles.mainContainer, paddingTop: StatusBar.currentHeight+5}} >
            <StatusBar backgroundColor={"#fff"}/>
            
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
                    onClick={() => {
                        setInputValue("");
                        navigation.navigate("SearchResults", {query: inputValue, type: selectedValue})
                    }}
                    placeholder={selectedValue === 'plato' ? "Buscar por plato..." : "Buscar por usuario..."}
                />
            </View>
            <View style={styles.filtersContainer}>
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {setIsModalVisible(false)}}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={()=>organizeRecipes()} style={{alignSelf:"center"}}>
                            <Feather name="filter" size={55} color="#553900" />
                        </TouchableOpacity>
                        <Text style={styles.titleModal}>Ordenar por</Text>

                        <View style={styles.radioContainer}>
                            <MaterialIcons name="sort-by-alpha" size={24} color="#F7EAB5" />
                            <RadioButton
                                    value="alfabeticamente"
                                    color='#fff'
                                    uncheckedColor='553900'
                                    status={ checked === 'alfabeticamente' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('alfabeticamente')}
                                        />
                            <Text style={styles.modalTextItem}>Alfabéticamente</Text>
                        </View>

                        <View style={styles.radioContainer}>
                            <SimpleLineIcons name="event" size={24} color="#F7EAB5" />
                                <RadioButton
                                        color='#fff'
                                        uncheckedColor='553900'
                                        value="antiguedad"
                                        status={ checked === 'antiguedad' ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked('antiguedad')}
                                            />
                            <Text style={styles.modalTextItem}>Antiguedad</Text>
                        </View>
                        <View style={styles.radioContainer}>
                        <Ionicons name="person-outline" size={24} color="#F7EAB5" />
                            <RadioButton
                                    color='#fff'
                                    value="usuario"
                                    uncheckedColor='553900'
                                    status={ checked === 'usuario' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('usuario')}                                    
                                        />
                            <Text style={styles.modalTextItem}>Nombre de Usuario</Text>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={()=>navigation.navigate("DashBoardFilter")}style={styles.filterButton}>
                    <Text style={styles.filterText}>Filtrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsModalVisible(true)}>
                    <Feather name="filter" size={32} color="#553900" />
                </TouchableOpacity>
            </View>
            
            <StatusBar style='dark' />
            <Text style={styles.text}>Recomendados</Text>
            <FlatList
                onRefresh={onRefresh}
                refreshing={isFetching}
                data={recipeList}
                style={{...styles.recipesContainer}}
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
                    />);
                }}
            />
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
        fontSize: 30,
        marginBottom: 30,
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
    modalContent: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf:"flex-end",

        margin: 0
    },
    modalContainer:{
        backgroundColor: "#F3A200",
        marginTop:"48%",
        borderRadius:25,
        flex:1,
        justifyContent:"space-evenly"
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
        marginBottom: 30,
        marginTop: 5,
        marginLeft: 30
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
    },
    titleModal:{
        fontWeight: "600",
        fontSize:35,
        color:"#fff",
        alignSelf:"center",
        marginBottom:"4%"
    },
    modalTextItem:{
        marginBottom:"2%",
        color:"#fff",
        fontWeight:"600",
        fontSize:25
    },
    radioContainer:{
        flexDirection:"row",
        marginLeft:"10%",
        alignItems:"center"
    }
})