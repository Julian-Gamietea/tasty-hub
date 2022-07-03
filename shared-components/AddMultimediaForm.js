import { DeletableImage } from "./DeletableImage";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export const AddMultimediaForm = ({ title, data, onPress, onRemove, titleStyle}) => {
    return (
        <View>
            <Text style={[styles.InputText, titleStyle]}>{title}</Text>
            <TouchableOpacity style={styles.addMultimedia} onPress={onPress}>
                <MaterialIcons name="add-a-photo" size={24} color="white" />
                <Text style={styles.addMultimediaText}>Añadir</Text>
            </TouchableOpacity>
            {data.length > 0 &&
                <ScrollView style={{ flexDirection: 'row', marginTop: 5 }} horizontal>
                    {data.map((elem, index) => (
                        <DeletableImage uri={elem.type.split("/")[0] === "image" ? elem.uri : elem.thumbnailUri} onPress={() => onRemove(index)} type={elem.type.split("/")[0] === "image" ? "Imagen" : "Video"} />
                    ))}
                </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({
    InputText: {
        fontFamily: "InterRegular",
        color: "#553900",
        fontSize: 18,
        marginBottom: 5
    },
    addMultimedia: {
        backgroundColor: "#F3A200",
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 110,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    addMultimediaText: {
        color: "#fff",
        fontFamily: "InterSemiBold",
        fontSize: 18
    }
})