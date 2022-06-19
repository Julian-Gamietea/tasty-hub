import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

export const CustomNav = ({ text, callback }) => {
	const [ loaded ] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf')
	});
	if (!loaded) {
		return null;
	}

	return (
		<View style={{...styles.container}}>
			<TouchableOpacity onPress={callback} style={styles.container}>
				<MaterialIcons name="west" size={40} color="#553900" />
			</TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	text: {
        fontFamily: 'InterMedium',
        fontSize: 22,
        marginLeft: 10
	}
});
