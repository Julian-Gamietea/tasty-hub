import { View, Text, Image, StyleSheet } from 'react-native';
import recipes from '../assets/recipes/recipes.png';
import { useFonts } from 'expo-font';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { CustomNav } from '../shared-components/CustomNav';
import { TextInput } from 'react-native-gesture-handler';
import clock from '../assets/recipes/clock.png';
import people from '../assets/recipes/people.png';
import portions from '../assets/recipes/portions.png';

export const RecipeForm = ({ navigation }) => {
	const [ loaded ] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf'),
		InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf')
	});
	if (!loaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.menu}>
				<CustomNav
					style={styles.navbar}
					callback={() => navigation.navigate('CreateRecipeName')}
					text="Nueva receta"
				/>
			</View>
			<View>
				<Text style={styles.recipeTitle}>Recipe Title</Text>
				<Text style={styles.description}>Descripción</Text>
				<TextInput style={styles.input} />
			</View>
			<View style={styles.composedInputs}>
				<View style={styles.inputRow}>
					<Image source={clock} style={styles.inputImage} />
					<TextInput style={styles.inputComposed} />
					<Text>minutos</Text>
				</View>
				<View style={styles.inputRow}>
					<Image source={clock} style={styles.inputImage} />
					<TextInput style={styles.inputComposed} />
					<Text>minutos</Text>
				</View>
				<View style={styles.inputRow}>
					<Image source={clock} style={styles.inputImage} />
					<TextInput style={styles.inputComposed} />
					<Text>minutos</Text>
				</View>
			</View>

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
	recipeTitle: {
		fontFamily: 'InterBold',
		fontSize: 29,
		color: '#E69D00'
	},
	description: {
		fontFamily: 'InterSemiBold',
		fontSize: 29,
		color: '#312102'
	},
	inputComposed: {
		borderColor: '#312102',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 30,
		paddingVertical: 10
	},
	inputRow: {
		flexDirection: 'row',
		flex: 0.33,
        marginHorizontal: 50
	},
	inputImage: {
		resizeMode: 'contain'
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
	},
	input: {
		borderColor: '#312102',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 140,
		paddingVertical: 40
	},
	composedInputs: {
		flexDirection: 'column',
		flex: 0.9
	}
});
