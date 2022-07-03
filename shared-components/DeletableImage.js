import { ImageBackground, Image, TouchableOpacity, View, Text } from "react-native"
import { Feather } from '@expo/vector-icons';

export const DeletableImage = ({ uri, onPress, type }) => {
    return (
        <ImageBackground source={{uri: uri}}
        style={{width: 100, height: 100,marginRight: 8, borderRadius: 10, overflow: 'hidden', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <View style={{marginRight: 10, borderRadius: 5, backgroundColor: "#e8e8e8", paddingHorizontal: 5, marginTop: 3}}>
                <Text>{type}</Text>
            </View>
            <TouchableOpacity 
            style={{backgroundColor: "#eb3434", borderRadius: 100, padding: 2}}
            onPress={onPress}
            >
                <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
        </ImageBackground>
    )
}