import { ImageBackground, Image, TouchableOpacity } from "react-native"
import { Feather } from '@expo/vector-icons';

export const DeletableImage = () => {
    return (
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"}}
        style={{width: 100, height: 100, marginRight: 8, borderRadius: 10, overflow: 'hidden', alignItems: 'flex-end'}}>
            <TouchableOpacity style={{backgroundColor: "#eb3434", borderRadius: 100, padding: 2}}>
                <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
        </ImageBackground>
    )
}