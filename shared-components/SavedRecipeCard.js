import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useFonts} from 'expo-font'
import { Feather } from '@expo/vector-icons'; 
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'

export const  SavedRecipeCard = ({ navigation,rating, id, directory, image, duration, ownerUserName, title, userPhoto}) => {
    const [loaded] = useFonts({
        InterBold: require ('../assets/fonts/Inter-Bold.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf'),
        InterMedium: require ('../assets/fonts/Inter-Medium.ttf')
    });
    if(!loaded){
        return null;
    }

    const handlePressVer = () => {
        navigation.navigate("Recipe", {filename: `Receta_${id}`})
    }

    const handlePressEliminar = () => {
        AsyncStorage.removeItem(`Receta_${id}`)
        .then((response) => console.log("Eliminado"))
        .catch((error) => console.log(error))

        FileSystem.deleteAsync(directory)
        .then(()=> console.log("directorio eliminado"))
        .catch((error)=>console.log(error))  
    }

    return(
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:image}}/>
        </View>
        <View style={styles.info}>
            <View style={styles.firstLine}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.durationContainer}>
                    <Feather name="clock" size={24} color="black" />
                    <Text style={styles.duration}>{duration} min</Text>
                </View> 
            </View>
            <View style={styles.secondLine}>
                <Image source={{uri:userPhoto}} style={styles.profileImage}/>
                <Text style={styles.profileName}>{ownerUserName}</Text>    
            </View>
            <View style={styles.rating}> 
                <StarRating
                    disabled={true}
                    emptyStar={'star'}
                    fullStar={'star'}
                    halfStar={'star'}
                    iconSet={'Feather'}
                    rating={rating}
                    fullStarColor={'#553900'}
                    emptyStarColor={'#FAEEC7'}
                    starSize={26}
                    halfStarEnabled={true}
                />
            </View>
            <View style={styles.buttonLine}>
                <TouchableOpacity style={styles.buttonVer} onPress={()=>handlePressVer()}>
                    <Text style={styles.buttonVerFont}>Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonEliminar} onPress={()=>handlePressEliminar()}>
                    <Text style={styles.buttonEliminarFont}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            
        </View>
   
    </View> 
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    imageContainer:{
        flex:3,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    image:{
        width:'100%',
        height:'100%',
        borderTopRightRadius: 15,
        borderTopLeftRadius:15
    },
    info:{
        paddingTop: 25,
        flex:2,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#FAEEC7',
    },
    title:{
        fontFamily: "InterBold",
        fontSize: 22
    },
    firstLine:{
        flex:1,
        flexDirection: 'row',
        marginLeft: "6%",
        marginRight: "5%",
        justifyContent: 'space-between'
    },
    duration:{
        fontFamily: 'InterLight',
        fontSize: 14,
        marginTop: '5%'
    },
    durationContainer:{
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-between'
    },
    secondLine:{
        flex: 2,
        flexDirection: 'row',
        marginLeft: '10%',
        height: '15%',
        alignItems:'center',
    },
    profileName:{
        fontFamily: 'InterMedium',
        fontSize: 18,
        marginLeft: '4%'
    },
    profileImage:{
        height: '75%',
        width: '15%',
        borderRadius: 100
    },
    rating:{
        flex:1,
        paddingTop: 10,
        width: '36%',
        marginLeft: '10%'
    },
    buttonLine:{
        flex: 2,
        paddingTop: 20,
        marginLeft: '10%',
        marginRight: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonVer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#F3A200',
        height: 45,
        width: 120,
        borderRadius: 7
    },
    buttonEliminar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#E70D0D',
        height: 45,
        width: 120,
        borderRadius: 7
    },
    buttonVerFont:{
        fontFamily: 'InterMedium',
        fontSize: 20,
        color: '#583209'
    },
    buttonEliminarFont:{
        fontFamily: 'InterMedium',
        fontSize: 20,
        color: '#fff'
    }

})