import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import group from '../assets/recalculate-recipe/group.png';

export const People = () => {
	const [ peopleQty, setPeopleQty ] = useState('');

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={group} />
			<Text style={styles.instructionsText}>Ingrese la cantidad de personas deseadas.</Text>
			<KeyboardAvoidingView>
				<View style={styles.qtyContainer}>
					<TextInput
						style={styles.input}
						keyboardType="numeric"
						maxLength={2}
						onChangeText={(qty) => setPeopleQty(qty)}
					/>
					<Text style={styles.inputText}>personas</Text>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	image: {
		marginTop: 50,
		height: 150,
		width: 150,
		justifyContent: 'center'
	},
	instructionsText: {
		fontFamily: 'InterSemiBold',
		fontSize: 18,
		color: '#553900',
		justifyContent: 'center',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20
	},
	qtyContainer: {
		flexDirection: 'row',
		padding: 50
	},
	input: {
		borderColor: '#DC9518',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	inputText: {
		fontSize: 16,
		color: '#553900',
		fontFamily: 'InterLight',
		marginTop: 15,
		marginLeft: 10
	}
});
