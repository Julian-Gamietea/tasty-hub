import {View, StyleSheet, StatusBar, Dimensions} from 'react-native'
import { CustomNav } from "../shared-components/CustomNav";
import { MaterialIcons } from '@expo/vector-icons';

export const Saved = () => {

    const onGoBack = ({navigation}) => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <CustomNav text={"Guardados"} callback={onGoBack} />
            <View style={styles.listContainer}>
                <View style={styles.cardContainer}>

                </View>
                <View style={styles.buttonDown}>
                    <MaterialIcons size={100} name="keyboard-arrow-down" color="#553900"/>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: "#fff"
    },
    listContainer:{
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width-15,
        alignSelf:'center',
        borderRadius: 15,
        marginBottom: '2%'
    },  
    buttonDown:{
        flex:1,
        alignItems:'center',
        backgroundColor:'red'
    },
    cardContainer:{
        flex: 9,
        backgroundColor: 'green',
        width: Dimensions.get('window').width-15,
        borderRadius:15
    }
})