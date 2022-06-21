import React from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import fork from '../assets/recalculate-recipe/fork.png';
import { Picker } from '@react-native-picker/picker';

export const IngredientScreen = () => {
    const [ selectedType, setSelectedType ] = React.useState(['gr']);
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={fork} />
			<Text style={styles.instructionsText}>Ingrese el ingrediente que usará como base.</Text>
            <TextInput style={styles.inputIngredient} keyboardType="default" maxLength={30} placeholder="E.g: Manteca" />
            <View style={styles.qtyContainer}>
                <Text style={styles.inputText}>Cantidad</Text>
				<TextInput style={styles.input} keyboardType="numeric" maxLength={4} />
                <View style={styles.pickerContainer}>
					<Picker
						style={styles.picker}
						selectedValue={selectedType}
						onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
						<Picker.Item label="gr" value="gr" />
						<Picker.Item label="onz" value="onz" />
						<Picker.Item label="kg" value="kg" />
					</Picker>
				</View>
			</View>
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
        marginTop: 20,
        marginBottom: 10
	},
    qtyContainer: {
		flexDirection: 'row',
		padding: 50,
        justifyContent: "space-between"
	},
    input: {
		borderColor: '#DC9518',
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	inputText: {
		fontSize: 16,
		color: '#553900',
		fontFamily: 'InterLight',
		marginTop: 20,
        marginRight: 15
	},
    inputIngredient: {
        borderColor: '#DC9518',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 120,
		paddingVertical: 10,
        marginTop: 10
    },
    picker: {
		width: 100,
		color: '#553900',
		fontFamily: 'InterSemiBold',
		justifyContent: 'center'

	},
	pickerContainer: {
		minWidth: 90,
		maxHeight: 50,
		borderRadius: 10,
		backgroundColor: '#F7EAB5',
		marginLeft: 15,
		marginTop: 9
	}
});