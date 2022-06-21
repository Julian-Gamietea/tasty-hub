import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import burger from '../assets/recipes/burger.png';
import nextArrow from '../assets/recipes/NextArrow.png'
import { useFonts } from 'expo-font';
import { CustomNav } from '../shared-components/CustomNav';
import { TextInput } from 'react-native-gesture-handler';

export const RecalculateRecipe = ({ navigation }) => {
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
				<CustomNav callback={() => navigation.navigate('StartUp')} text="Recalcular receta" />
			</View>
            
			<Text style={styles.title}>Crear receta</Text>
			<Image style={styles.image} source={burger} />
			<Text style={styles.dishName}>Nombre del plato</Text>
			<TextInput style={styles.input} />
			<TouchableOpacity onPress={() => navigation.navigate('Home')}>
				<Image source={nextArrow} style={styles.nextArrow}></Image>
			</TouchableOpacity>
		</View>
	);
};