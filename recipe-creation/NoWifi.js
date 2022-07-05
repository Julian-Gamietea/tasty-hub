import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import recipes from '../assets/recipes/recipes.png';
import { useFonts } from 'expo-font';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { CustomNav } from '../shared-components/CustomNav';
import { MaterialIcons } from '@expo/vector-icons';

export const NoWifi = ({ navigation, route }) => {
    const {nextScreen} = route.params;
    const {data} = route.params; 
	const [ loaded ] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf')
	});
	if (!loaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.menu}>
				<CustomNav style={styles.navbar} callback={() => navigation.goBack()} text="Crear receta" />
			</View>
            <View style={[styles.container, {justifyContent: 'space-around'}]}>
                <MaterialIcons name="info" size={120} color="#F3A200" />
                <Text style={styles.text}>
                La receta se almacenará en su dispositivo hasta disponer de una red Wi-Fi. Sin embargo, hay algunas funciones que requerirán del uso mínimo de sus datos móviles.
                {'\n\n'}¿Desea continuar de todas formas?
                </Text>
                <View style={styles.button}>
                    <ButtonCustom style={{width: 150, elevation: 0, borderRadius: 5}} callback={() => navigation.navigate(nextScreen, {cellular: true, data: data})} text="Continuar" />
                    <ButtonCustom style={{width: 150, elevation: 0, borderRadius: 5}} callback={() => navigation.navigate('WelcomeScreen')} text="Descartar" />
                </View>
            </View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 5,
	},
	image: {
		marginTop: 50,
        width: 220,
        height: 200
	},
	text: {
		marginTop: 20,
		marginLeft: 5,
		marginRight: 5,
		fontFamily: 'InterMedium',
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20,
		color: '#000'
	},
	button: {
		marginTop: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: Dimensions.get("screen").width - 50
	},
	menu: {
		alignSelf: 'flex-start',
		marginLeft: 19
	}
});