import { TouchableOpacity ,View, StyleSheet, Text, ScrollView, Image} from "react-native"
import {useFonts} from 'expo-font'
import * as React from 'react';
import { ButtonCustom } from "../shared-components/ButtonCustom";
import camera from "../assets/register/camera.png"
import circle from "../assets/register/cameracircle.png"
import * as ImagePicker from 'expo-image-picker'

export const EnterAvatar = ({navigation}) => {

    React.useEffect( ()=> {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        });
    }, [] );
    const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [hasImage, setHasImage] = React.useState(false);
    const [loaded] = useFonts({
        InterSemiBold: require ('../assets/fonts/Inter-SemiBold.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf')
    });
   
    if(!loaded){
        return null;
    }
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        console.log(result);

        if(!result.cancelled){
            setImage(result.uri);
            setHasImage(true);
        }  
    };

    if(hasGalleryPermission === false){
        return <Text> No access to Internal Storage </Text>
    }
    
    
    
    return (
        <ScrollView style ={styles.container}>
            
                <View style = {styles.textContainer}>
                    <Text style = {styles.text}>
                        PASO 4/4
                    </Text>
                    <Text style = {styles.text2}>
                        Cargue su avatar
                    </Text>
                </View>
                <View style = {styles.formContainer}>
                    <Text style = {styles.text3}> Cargue su avatar </Text>
                    <Text style = {styles.text4} > Opcional </Text>
                    <View style = {{alignItems: 'center'}}>
                        <TouchableOpacity 
                            style = {styles.camera}
                            onPress = {()=> pickImage()}>
                                {hasImage 
                            
                                ?   <View>

                                        <Image style = {{height: 180, width: 180, position: 'absolute', top:21, left: 21.5, borderRadius: 100, zIndex: 100,}} source = {{uri: image}}></Image> 
                                        <Image style = {{height: 220, width: 220}} source = {circle}></Image> 
                                    </View> 
                                
                                :   <View style = {styles.camera}>
                                        <Image style = {{position: 'absolute', zIndex: 100, top: 55}} source = {camera}></Image>   
                                        <Image style = {{height: 200, width: 200}} source = {circle}></Image>     
                                    </View>
                 
                                }
                           
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.text5} > Si no desea cargar un avatar, se le asignará {'\n'} uno predeterminado </Text>
                    <View style = {styles.formContainerItem2}>
                        <ButtonCustom text = 'Continuar'/>
                    </View>
                </View>  
                
                
        </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor: '#fff',
            margin:0
        }
        ,
        text:{
            fontFamily: "InterSemiBold",
            fontSize: 36,
            paddingBottom:10,
        }
        ,
        text2:{
            fontFamily: "InterSemiBold",
            fontSize: 36,
            paddingBottom:18,
            textAlign: 'center'
        }
        ,
        text3:{
            fontFamily: "InterSemiBold",
            fontSize: 24,
            marginTop: 40,
            paddingBottom:18,
            textAlign: 'center'
        }
        ,
        text4:{
            fontFamily: "InterSemiBold",
            fontSize: 14,
            paddingBottom:18
        }
        ,
        text5:{
            fontFamily: "InterLight",
            fontSize: 14,
            marginTop: 40,
            marginBottom:30,
            textAlign: 'center'
        }
        ,
        camera:{
            flex: 1,
            alignItems:'center',
            height: 200,
            width: 200,
            borderRadius: 200
        }
        ,
        image:{
            flex: 1,
            height: 180,
            width: 180,
        }
        ,
        textContainer:{
            flex:1,
            marginTop: 70,
            alignItems: 'center'
        }
        ,
        formContainer:{
            flex:4,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start'
        }
        ,
        formContainerItem:{
            flex:1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 20
        }
        ,
        formContainerItem2:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 15,
            marginBottom: 20,
            marginTop: 25
        }
        ,
        button:{
            width: 20
        }
        
    }
)