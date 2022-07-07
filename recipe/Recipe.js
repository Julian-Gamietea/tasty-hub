import { ActivityIndicator, ScrollView, StyleSheet, View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import {useFonts} from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from "@expo/vector-icons";
import StarRating from 'react-native-star-rating';
import * as React from 'react';
import { InputTasty } from "../shared-components/InputTasty";
import axios from "axios";
import { NotificationModal } from "../shared-components/NotificationModal";
import { CarrouselImages } from "../shared-components/CarrouselImages";
import Carrousel from "../carrousel-instructions/Carrousel";
import * as FileSystem from 'expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 

console.disableYellowBox = true;

export const Recipe = ({route, navigation}) => {
    const {factor} = route.params
    const {userId} = route.params;
    const {id} = route.params;
    const {recalculated} = route.params;
    const {filename} = route.params

    React.useEffect(() => {
        const getStoragedIngredients = async () => {
            try{
                const jsonValue = await AsyncStorage.getItem(`Receta_${id}_${userId}`)
                return JSON.parse(jsonValue).ingredientes;
            } catch(e) {
                console.log(e)
            }
        }

        const isSaved = async (id) => {
            let keys = []
            let stop = false;
            try {
                keys = await AsyncStorage.getAllKeys()
                for (const key of keys){
                    if(key ===`Receta_${id}_${userId}` && recalculated){
                        setOverwrite(true)
                        const ingStoraged = await getStoragedIngredients()
                        for (let index = 0; index < ingStoraged.length; index++) {
                            if(ingStoraged[index].quantity !== recalculated[index].quantity){
                                setSaved(false)
                                stop = true;
                                break;
                            }
                        }
                        if(stop === false){
                            setSaved(true)
                        }
                    }
                }
            } catch(e) {
                console.log(e)
            }
        }

        if(!filename){
            const array = []
            
            const fetchData = () => {
                
                var axios = require('axios');
                var config = {
                method: 'get',
                url: `https://tasty-hub.herokuapp.com/api/recipes/${id}`,
                headers: { }
                };
    
                axios(config)
                .then(function (response) {
                    setLoading(true)
                    // SETTING THE RECIPE INFORMATION 
                    setDatos(response.data)
                    array.push(response.data.mainPhoto)
                    const id = response.data.id
                    isSaved(id)
                    
                    // GETTING THE USER PHOTO

                    axios.get(`https://tasty-hub.herokuapp.com/api/user/${response.data.ownerId}`)
                    .then((response) => setUserProfilePhoto(response.data.avatar))
                    .catch((error) => console.log(error))

                    if(typeof(recalculated) == "undefined"){
                        var config2 = {
                            method: 'get',
                            url: `https://tasty-hub.herokuapp.com/api/ingredientQuantity?recipeId=${id}`,
                            headers: { }
                        };
            
                        axios(config2)
                        .then((response) => {
                            setIngredientes(response.data)
    
                            axios.get(`https://tasty-hub.herokuapp.com/api/instruction/recipe/${id}`)
                            .then((response) => {setInstructions(response.data)})
                            .catch((error) => console.log(error))
                        })
                        .catch((error) => {
                            console.log("ERROR 1 " + error)
                        })
                    }else{
                        setIngredientes(recalculated)
                        setLoading(false)
                    }
                    
    
                    var config3 = {
                        method: 'get',
                        url: `https://tasty-hub.herokuapp.com/api/rating/average/${id}`,
                        headers: { }
                        };
                        
                        axios(config3)
                        .then(function (response) {
    
                            // SETTING THE RECIPE RATING
    
                            if(!isNaN(response.data)){
                                setStarCount2(response.data)
                            }
                        
                        })
                        .catch(function (error) {
                        console.log("ERROR 2" + error);
                        }); 
                })
                .catch(function (error) {
                    console.log("ERROR 3 " + error);
                }); 
                
                //ASKING IF THE RECIPE IS ALREADY ADDED TO FAVORITES
    
                axios.get(`https://tasty-hub.herokuapp.com/api/favorite/${userId}`)
                .then((response)=>{
                    const favorites = response.data;
                    favorites.forEach(element => {
                        
                        if(element.recipeId === id){
                            setAddedFavorites(true)
                        }
                    });
                })
                .catch((error) => console.log( "ERROR 4 " + error))
    
                //ASKING IF THE USER HAVE A RATING FOR THE CURRENT RECIPE
    
                axios.get(`https://tasty-hub.herokuapp.com/api/rating/user?recipeId=${id}&userId=${userId}`)
                .then((response)=>{
                    setHasRating(true)
                    setStarCount(response.data.rating)
                    setComments(response.data.comments)
                })
                .catch(()=>{
                    setHasRating(false)
                    // Dont send any error because its ok if the user hasnt got a recipe rating in this recipe
                })
                
    
                // GETTING THE REST OF THE RECIPE IMAGES
    
                axios.get(`https://tasty-hub.herokuapp.com/api/recipePhotos/recipe/${id}`)
                .then((response)=>{
                    response.data.forEach(element => {
                        array.push(element.photoUrl)
                    });
                    setLoading(false)
                })
                .catch((error)=>
                
                 console.log("ERROR 6" + error)
                 )
                setRecipeImages(array)
                
    
            }
            fetchData();
            
        }else{
            setLoading(true)
            const fetchStoragedData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem(filename)
                    if(jsonValue !== null){
                        setDatos(JSON.parse(jsonValue).datos)
                        setIngredientes(JSON.parse(jsonValue).ingredientes)
                        setInstructions(JSON.parse(jsonValue).instructions)
                        setMultimedia(JSON.parse(jsonValue).multimedia)
                        setRecipeImages(JSON.parse(jsonValue).images)
                        setStarCount2(JSON.parse(jsonValue).rating)
                        setSaved(true)
                        setLoading(false)
                    }
                } catch(e) {
                    console.log(e)
                }
            }

            fetchStoragedData()
            
        }
        
    },[focus, recalculated]);

    const [hasRating, setHasRating] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const focus = useIsFocused();
    const [overwrite, setOverwrite] = React.useState(false)
    const [userProfilePhoto, setUserProfilePhoto] = React.useState("")
    const [multimedia, setMultimedia] = React.useState([])
    const [instructions, setInstructions] = React.useState([])
    const [imgActive, setImgActive] = React.useState(0)
    const [recipeImages, setRecipeImages] = React.useState([])
    const [datos, setDatos] = React.useState([])
    const [ingredientes, setIngredientes] = React.useState([])
    const [comments, setComments] = React.useState("")
    const [modalVisible, setModalVisible] = React.useState(false);
    const [starCount, setStarCount] = React.useState(null);
    const [starCount2, setStarCount2] = React.useState(0);
    const [addedFavorites, setAddedFavorites] = React.useState(false)
    const [notificationText, setNotificationText] = React.useState("")
    const [notification, setNotification] = React.useState(false)
    const [notificationGuardadas, setNotificationGuardadas] = React.useState(false)
    const [notificationRecordat, setNotificationRecordat] = React.useState(false)
    const [saved, setSaved] = React.useState(false) 
    const [uri, setUri] = React.useState("")
    const [loaded] = useFonts({
        InterBlack: require ('../assets/fonts/Inter-Black.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf'),
        InterMedium: require ('../assets/fonts/Inter-Medium.ttf')
    });
    if(!loaded){
        return null;
    }


    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    }

    const enviar = () => {
        setModalVisible(true)
    }


    

    const closeModalSend = () => {
        var axios = require('axios');
        var data = JSON.stringify({
        "comments": comments,
        "rating": starCount,
        "recipeId": id,
        "userId": userId
        });
        
        if(!hasRating){
            var configNull = {
            method: 'post',
            url: 'https://tasty-hub.herokuapp.com/api/rating',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios(configNull)
            .then(function () {
                setModalVisible(!modalVisible)
                setComments("");
                setStarCount(0)       
            })
            .catch(function (error) {
                console.log("ERROR 7 post " + error);
            });
        }else{
            var configNotNull = {
            method: 'put',
            url: 'https://tasty-hub.herokuapp.com/api/rating',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
    
            axios(configNotNull)
            .then(function () {
                setModalVisible(!modalVisible)
                setComments("");
                setStarCount(0)       
            })
            .catch(function (error) {
                console.log("ERROR 7 put " + error);
            });
        }
        

        
    }

    const closeModalNoSend = () => {
        setModalVisible(!modalVisible)
        setStarCount(0)
    }

    const addFavorites = () => {
        if(!addedFavorites){
            axios.post(`https://tasty-hub.herokuapp.com/api/favorite?recipeId=${id}&userId=${userId}`)
            .then(()=>{
                setAddedFavorites(true)    
                showNotification('Favoritas')
            })
            .catch((error)=>{
                console.log("ERROR 8" + error)
            })
        }else{
            axios.delete(`https://tasty-hub.herokuapp.com/api/favorite/delete?recipeId=${id}&userId=${userId}`)
            .then(()=>{
                setAddedFavorites(false)
                showNotification('Favoritas')
            })
            .catch((error)=>{
                console.log("ERROR 9" + error)
            })
        }
    
    }

    const showNotification = (type) => {
        if(type === 'Favoritas'){
            setNotification(true);
            setTimeout(() => {
                setNotification(false);
            }, 1500);
        }else if(type==='Guardadas'){
            setNotificationGuardadas(true);
            setTimeout(() => {
                setNotificationGuardadas(false);
            }, 1500);
        }else{
            setNotificationRecordat(true)
            setTimeout(() => {
                setNotificationRecordat(false);
            }, 4000);
        }
       
    }

    
    const save = async () => {

        const filename = `Receta_${datos.id}_${userId}`
        const directory = FileSystem.documentDirectory+filename;

        if (!saved){

            let keys = []
            try {
                keys = await AsyncStorage.getAllKeys()
            } catch(e) {
                console.log(e)
            }

            if(keys.length >= 5){
                showNotification('Guardadas')
            }else{
                
                if(!overwrite){
                    
                    FileSystem.makeDirectoryAsync(directory)
                    .then((response)=>console.log("Directorio Creado"))
                    .catch((error)=>console.log(error))
    
                    FileSystem.makeDirectoryAsync(directory+'/photos/')
                    .then((response)=>console.log("Directorio de fotos creado"))
                    .catch((error)=>console.log(error))
                }
               
                
                const cargarData = async () => {
                    let multimedia = []
                    let images = []

                    if(!overwrite){
                        for (let i = 0; i < recipeImages.length; i++) {
                        const extension = recipeImages[i].split('.')
                        await FileSystem.downloadAsync(recipeImages[i], directory+'/photos/photo_'+i+'.'+extension[extension.length-1])
                        images.push(directory+'/photos/photo_'+i+'.'+extension[extension.length-1])    
                        }

                        let index = 0;
                        for (const inst of instructions){
                            const subMultimedia = [];
                            const instructionDir = directory+'/instruction'+index+'/';
                            try{
                                await FileSystem.makeDirectoryAsync(instructionDir)
                            }catch(e){
                                console.log(e)
                            }

                            try{
                                const res = await axios.get(`https://tasty-hub.herokuapp.com/api/multimedia/instruction/${inst.id}`)
                                const data = res.data
                                
                                for (const multi of data){
                                    try{
                                        await FileSystem.downloadAsync(multi.urlContent, instructionDir+'multimedia_'+index+'.'+multi.extension)
                                        subMultimedia.push(instructionDir+'multimedia_'+index+'.'+multi.extension)
                                        //console.log(instructionDir+'multimedia_'+index+'.'+multi.extension)
                                    }catch(e){
                                        console.log(e)
                                    }
                                }
                                
                                multimedia.push(subMultimedia)
                                
                            }catch(e){
                                console.log(e)
                            }

                            index ++;
                        }
                    }else{
                        try {
                            const jsonValue = await AsyncStorage.getItem(filename)
                            multimedia = JSON.parse(jsonValue).multimedia
                            images = JSON.parse(jsonValue).images
                        } catch(e) {
                            console.log(e)
                        }
                    }

                    const newData = {
                        description: datos.description,
                        duration: datos.duration,
                        enabled: datos.enabled,
                        id: datos.id,
                        mainPhoto: datos.mainPhoto,
                        name: datos.name,
                        ownerId: datos.ownerId,
                        ownerUserName: datos.ownerUserName,
                        peopleAmount: datos.peopleAmount*factor,
                        portions: datos.portions*factor,
                        timestamp: datos.timestamp,
                        typeId: datos.typeId,
                        typeName: datos.typeName,
                    }

                    const object  = {
                        datos: newData,
                        rating: starCount2,
                        ingredientes: recalculated,
                        instructions: instructions,
                        directory: directory,
                        images: images,
                        multimedia: multimedia,
                        avatarUser: userProfilePhoto
                    }

                    
                    AsyncStorage.setItem(filename, JSON.stringify(object))
                    .then(()=>{
                        console.log("Agregado al AsyncStorage")
                        setSaved(true)
                        showNotification('Recordat')
                    })
                    .catch((error) => console.log(error))
                    
                }

                cargarData()
            }
            
        }else{
            setSaved(false)
            
            AsyncStorage.removeItem(filename)
            .then((response) => console.log("Eliminado del AsyncStorage"))
            .catch((error) => console.log(error))

            FileSystem.deleteAsync(directory)
            .then(()=> console.log("Directorio eliminado"))
            .catch((error)=>console.log(error))  
        }
    }
    
    if(loading){
        return(
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#ffff'}}>
                <ActivityIndicator size="large" color='#553900' /> 
            </View>
        )
    }else{
        return(
        
            <ScrollView style={styles.container}>  
                <View style={styles.titleContainer}>
                    <Text style={styles.title}> {datos.name} </Text>
                    <View style={styles.ratings}>
                        <StarRating
                            disabled={true}
                            emptyStar={'star'}
                            fullStar={'star'}
                            halfStar={'star'}
                            iconSet={'Feather'}
                            maxStars={starCount2}
                            rating={starCount2}
                            fullStarColor={'#553900'}
                            starSize={26}
                            halfStarEnabled={true}
                        />
                    </View>
                   
                </View>
                <View style={styles.profile}>
                    <MaterialIcons name="person" size={24} color="#5D420C" />
                    <Text style={styles.profileName}> {datos.ownerUserName} </Text> 
                    {!filename && <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("UserProfile", {id: datos.ownerId})}>
                        <MaterialIcons name="portrait" size={24} color="white" />
                        <Text style={styles.buttonText}> Ver perfil</Text>
                    </TouchableOpacity>}
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem1}>
                        <View style={{flexDirection:'row', marginBottom: 5}}>
                            <MaterialIcons name="group" size={24} color="#5D420C" />
                            <Text style={styles.infoText}> {factor ? Math.ceil(datos.peopleAmount*factor) : Math.ceil(datos.peopleAmount) } personas </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Feather name="pie-chart" size={24} color="#5D420C" />
                            <Text style={styles.infoText}> {factor ? Math.ceil(datos.portions*factor) : Math.ceil(datos.portions)} porciones </Text>
                        </View>  
                    </View>
                    <View style={styles.infoItem2}>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Feather name="clock" size={24} color="#5D420C" />
                            <Text style={styles.infoText}> {datos.duration} min </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name="tags" size={24} color="#5D420C"  />
                            <Text style={styles.infoText}> {datos.typeName}</Text>
                        </View>
                    </View>
                </View>
                
                {!filename && <View style={styles.buttons}>
                    <TouchableOpacity onPress={()=> addFavorites()} style={styles.favouritesButton}>
                        {addedFavorites
                            ? <Ionicons name="bookmark" size={24} color="#fff" /> 
                            : <Ionicons name="bookmark-outline" size={24} color="#fff" />
                        }
                            <Text style={styles.buttonText}> {!addedFavorites ? 'Añadir a \n favoritos' : 'Eliminar de \n  favoritos'} </Text>
                    </TouchableOpacity>
                    {recalculated && <TouchableOpacity 
                        onPress={()=> save()}  
                        style={styles.profileButton}
                    >
                        {saved
                            ? <Ionicons name="download" size={24} color="white" /> 
                            : <Ionicons name="download-outline" size={24} color="white" />
                        }
                        <Text style={styles.buttonText}> {!saved ? 'Guardar' : 'Guardada'} </Text>
                    </TouchableOpacity>}
                    
                </View>}
    
                <CarrouselImages recipeImages = {recipeImages}/>
    
                <View style={styles.descriptionContainer}>
                    <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8}}>
                        <MaterialIcons name="info" size={24} color="#5D420C" />
                        <Text style={styles.descriptionTitle} > Descripción </Text>
                    </View>
                    <Text style={styles.descripcionContent}> {datos.description}</Text>
                </View>
    
                <View style={styles.descriptionContainer}>
                    <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8}}>
                        <MaterialIcons name="restaurant" size={24} color="#5D420C" />
                        <Text style={styles.descriptionTitle}> Ingredientes </Text> 
                    </View>
                    <View style={{flexDirection:'column'}}>
                        {ingredientes.map((element, index) => {
                            return( 
                            <Text key={index} style={styles.ingredientItemText}> - {parseFloat(element.quantity).toFixed(2)} {element.unitName} de {element.ingredientName} </Text>);  
                        })
                        }
                        
                    </View>
                   
                </View>
                
                {!filename && <View style={styles.recalculateContainer}>
                    <Text style={styles.recalculateText}>¿Necesitas {'\n'} otras {'\n'} proporciones {'\n'} de esta receta? </Text>
                    <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("RecalculateRecipe", {userId: userId, recipeId: id})}>
                    <Text style={styles.buttonTextRecalculate}>Recalcular {'\n'} receta</Text>
                    </TouchableOpacity>
                </View>}
    
                <View style={styles.instructionContainer}>
                    <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8, marginLeft: 25}}>
                        <MaterialIcons name="menu-book" size={24} color="#5D420C"/>
                        <Text style={styles.descriptionTitle}>  Instrucciones </Text>
                    </View>
                    <View style={styles.instructionGreyContainer}>
                        <Carrousel id={id} multimediaSaved={multimedia} instructionsSaved={instructions}/>
                    </View>
                </View>
    
                {!filename && <View styles={styles.descriptionContainer}>
                    <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8, marginLeft: 25}}> 
                        <MaterialIcons name="military-tech" size={24} color="#5D420C" />
                        <Text style={styles.descriptionTitle}> Calificar </Text>
                    </View>
                    <Text style={styles.calificationText}>¿Cómo calificarías esta receta?</Text>
                    <View style={styles.starsContainer}>
                        <StarRating
                            disabled={false}
                            emptyStar={'star-fill'}
                            fullStar={'star-fill'}
                            halfStar={'star-fill'}
                            iconSet={'Octicons'}
                            maxStars={5}
                            rating={starCount}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            fullStarColor={'#967127'}
                            emptyStarColor={'#EFD87B'}
                            starSize={52}
                        />
                    </View>
    
                    <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={()=> enviar()}>
                        <Text style={styles.buttonTextSend}>Enviar</Text>
                    </TouchableOpacity>
                </View>}
    
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View> 
                                <Text style={styles.modalText}>¿Desea dejar algun comentario a la receta?</Text>
                                <InputTasty
                                    placeholder = 'Ingrese aqui (opcional)'
                                    value =  {comments}
                                    onChange={(text) => setComments(text)}
                                    isValid = {true}   
                                />
                                <View style={{flexDirection: 'row', justifyContent:'center', backgroundColor: '#fff'}}> 
                                    <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => closeModalSend()}
                                    >
                                    <Text style={styles.textStyle}>Continuar</Text>
                                    </Pressable>
                                    <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => closeModalNoSend()}
                                    >
                                    <Text style={styles.textStyle}>Volver</Text>
                                    </Pressable>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </Modal>
    
                {recalculated && saved && <NotificationModal
                    visible={notificationRecordat}
                    onRequestClose={()=>setNotificationRecordat(!notificationRecordat)}
                    onPress={()=>setNotificationRecordat(!notificationRecordat)}
                    message={"¡RECUERDE! Cualquier modificacion que desee guardar sobreescribirá la ya guardada"}
                />}
                <NotificationModal
                    visible={notificationGuardadas}
                    onRequestClose={()=>setNotificationGuardadas(!notificationGuardadas)}
                    onPress={()=>setNotificationGuardadas(!notificationGuardadas)}
                    message={"Ha alcanzado el máximo de 5 recetas guardadas"}
                />
                <NotificationModal
                    visible={notification}
                    onRequestClose={()=>setNotification(!notification)}
                    onPress={()=>setNotification(!notification)}
                    message={addedFavorites ? "Receta agregada a Favoritos!" : "Receta eliminada de Favoritos!"}
                />
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    titleContainer:{
        flex: 1,
        marginTop: 60,
    },
    title:{
        fontFamily: 'InterBlack',
        fontSize: 27,
        textAlign: 'center',
        marginBottom: 5,
        color: '#553900'
    },
    ratings:{
        flexDirection: 'row',
        justifyContent: 'center'
    },


    profile:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        marginLeft: 25,
        marginTop: 20
    },
    profileName:{
        fontFamily: 'InterMedium',
        fontSize: 16,
        marginRight: 20,
        color: '#553900'
    },
    profileButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#5D420C',
        height: 45,
        width: 120,
        borderRadius: 20
    },
    buttonText: {
        color: '#fff',
        fontFamily:'InterMedium',
        fontSize: 14
    },

    info:{
        flex: 1,
        marginTop: 20,
        marginLeft: 25,
        marginRight: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoText:{
        fontFamily: 'InterRegular',
        color: '#553900'  
    },
    infoItem1:{
        flexDirection: 'column'
    },
    infoItem2:{
        flexDirection: 'column'
    },

    buttons:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 15
    },
    favouritesButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#5D420C',
        height: 45,
        width: 120,
        borderRadius: 20,
        marginLeft: 25,
        marginRight: 10
        
    },

    image:{
        width: "400",
        height: 400
    },
    imageDot:{
        position:'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    dotActive:{
        margin: 3,
        color: 'black'
    },
    dot:{
        margin: 3,
        color: 'white'
    },

    descriptionContainer:{
        flex: 1,
        marginLeft: 25,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20

    },

    descripcionContent:{
        color: '#553900',
        fontFamily: 'InterLight',
        fontSize: 18
    },

    descriptionTitle:{
        fontFamily: 'InterMedium',
        fontSize: 24,
        color: '#553900'
    },



    ingredientItemText:{
        fontFamily: 'InterLight',
        fontSize: 18,
        color: '#553900',
        
    },

    recalculateContainer:{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 35,
        marginTop: 10,
        alignItems:'center',
        justifyContent: 'space-between'
    },
    recalculateText:{
        fontFamily: 'InterMedium',
        fontSize: 18,
        color: '#553900',
    },
    buttonTextRecalculate:{
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'InterMedium'
    },

    instructionContainer:{
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        
    },

    instructionGreyContainer:{
        flex:1,
        marginTop: 10,
        backgroundColor: '#E8E8E8',
        borderRadius: 20,
        // height: 550,
    },

    calificationText:{
        textAlign: 'center',
        fontFamily: 'InterLight',
        fontSize: 18,
        color: "#553900"
    },

    starsContainer:{
        width: 300,
        alignSelf:'center',
        marginTop: 15,
    },

    sendButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#5D420C',
        height: 45,
        width: 120,
        borderRadius: 20,
        alignSelf:'center',
        marginTop: 20,
        marginBottom: 30
    },

    buttonTextSend:{
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'InterBlack',
        fontSize: 23,
        
    },




    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 18,
        padding: 10,
        elevation: 2,
        backgroundColor:'#5D420C' 
      },
      
      buttonClose: {
        marginTop: 20,
        marginLeft:10,
        marginRight: 10,
        width: 100,
        backgroundColor: '#5D420C',
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'InterLight',
        fontSize: 20
      }
   


})
