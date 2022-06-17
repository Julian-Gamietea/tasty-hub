import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList, Modal, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const DropdownMenu = ({ label, data }) => {
    const [visible, setVisible] = React.useState(false);
    const [dropdownTop, setDropdownTop] = React.useState(0);
    const [selected, setSelected] = React.useState(undefined);
    const DropdownButton = React.useRef();

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    }

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity
                style={styles.overlay}
                onPress={() => setVisible(false)}
            >
                <View style={[styles.dropdown, { top: dropdownTop }]}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    }

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>
            <Entypo name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        marginRight: 10,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
});