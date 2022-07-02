import {Text ,View, StyleSheet, StatusBar, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import { CustomNav } from "../shared-components/CustomNav";
import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { CarrouselImages } from '../shared-components/CarrouselImages';
import { SavedRecipeCard } from '../shared-components/SavedRecipeCard';

export const Saved = () => {
    const [recipes, setRecipes] = React.useState([]);

    const getStoragedData = async () => {
        let keys = []
        let recipesAux = []
        try {
            keys = await AsyncStorage.getAllKeys()
            for await (const key of keys) {
                const jsonValue = await AsyncStorage.getItem(key)
                recipesAux.push(JSON.parse(jsonValue))
            }
            setRecipes(recipesAux)
            console.log(recipes)
        } catch(e) {
            console.log(e)
        }
    }
    React.useEffect(()=>{
        getStoragedData() 
    },[])

   

    const onGoBack = ({navigation}) => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <CustomNav style={{flex:1}} text={"Guardados"} callback={onGoBack} />
            <View style={styles.listContainer}>
                <ScrollView pagingEnabled>
                    {
                        recipes.map((element,index) => {
                            return(
                                <View style={{height: 616, width: '100%'}}>
                                    <SavedRecipeCard 
                                        key={index}
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
            <View style={styles.emptySpace}/>
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
    emptySpace:{
        flex:1 
    },
    
})