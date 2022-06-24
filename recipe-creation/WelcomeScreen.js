import { View, Text, Image, StyleSheet } from 'react-native';
import recipes from '../assets/recipes/recipes.png';
import { useFonts } from 'expo-font';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { CustomNav } from '../shared-components/CustomNav';

export const WelcomeScreen = ({ navigation }) => {
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
				<CustomNav style={styles.navbar} callback={() => navigation.navigate('Dashboard')} text="Crear receta" />
			</View>
			<Image style={styles.image} source={recipes} />
			<Text style={styles.text}>
				Crear una receta le permite compartir con la comunidad sus mejores recetas de una manera fácil y rápida.
				{'\n'} {'\n'} Especifique los pasos, adjunte videos o fotografías y deje que su receta se convierta en
				la más consultada de Tasty Hub.
			</Text>
			<View style={styles.button}>
				<ButtonCustom callback={() => navigation.navigate('CreateRecipeName')} text="¡Comenzar!" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
        paddingTop: 60
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
		color: '#553900'
	},
	button: {
		flex: 1,
		marginTop: 80,
		width: 300
	},
	menu: {
		alignSelf: 'flex-start',
		marginLeft: 19
	}
});