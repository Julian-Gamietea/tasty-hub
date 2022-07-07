import {Text,View, StyleSheet, StatusBar, RefreshControl, Dimensions, ScrollView} from 'react-native'
import { CustomNav } from "../shared-components/CustomNav";
import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedRecipeCard } from '../shared-components/SavedRecipeCard';
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export const Saved = ({navigation}) => {

    const [recipes, setRecipes] = React.useState([]);
    const focus = useIsFocused();
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [idUser, setUserId] = React.useState(null)

    const getStoragedData = async () => {
        let keys = []
        let recipesAux = []

        const userData = await SecureStore.getItemAsync("user");
        setUserId(JSON.parse(userData).id)

        try {
            keys = await AsyncStorage.getAllKeys()
            for await (const key of keys) {
                const data = key.split('_')
                const user = data[data.length-1]
                if(user == idUser){
                    const jsonValue = await AsyncStorage.getItem(key)
                    recipesAux.push(JSON.parse(jsonValue))
                }
            }
            setRecipes(recipesAux)
            setIsRefreshing(false)
        } catch(e) {
            console.log(e)
        }
    }
    React.useEffect(()=>{
        getStoragedData() 
    },[focus, idUser])

   
    const onRefresh = () => {
        setIsRefreshing(true);
        getStoragedData();
    }

    const onGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <CustomNav style={{flex:1}} text={"Guardados"} callback={onGoBack} />
            <View  style={styles.listContainer}>
                <ScrollView 
                    refreshControl={<RefreshControl refreshing = {isRefreshing} onRefresh = {onRefresh}/>}
                    pagingEnabled
                >
                    {
                        recipes.map((element,index) => {
                            return(
                                <View key={index} style={{height: 750, width: '100%'}}>
                                    <SavedRecipeCard 
                                        userId={idUser}
                                        navigation={navigation}
                                        id={element.datos.id}
                                        rating={element.rating} 
                                        directory={element.directory}
                                        image={element.images[0]}
                                        duration={element.datos.duration}
                                        ownerUserName={element.datos.ownerUserName}
                                        title={element.datos.name}
                                        userPhoto={element.avatarUser}
                                    />
                                </View>
                            );
                        })
                    }

                </ScrollView>
            </View>
            {recipes.length === 0 && 
            <View style={styles.emptyMessage}>
                <Text style={styles.text}>Aún no tenés recetas guardadas...</Text>
                <MaterialIcons name="save-alt" size={80} color="#e8e8e8" />
            </View>}
            
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: 'white',
    },
    listContainer:{
        paddingTop: 10,
        flex: 10,
        width: '95%',
        alignSelf: 'center'
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
        
    },
    text2: {
        
    }
})