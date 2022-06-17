import { View, StyleSheet, Text, Modal, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons';
import React from 'react';

export const NotificationModal = ({visible, onRequestClose, onPress, message}) => {
    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{message}</Text>
                        <Pressable
                            onPress={onPress}
                        >
                            <Entypo name="cross" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create(
    {
        centeredView: {
            flex: 1,
            justifyContent: "flex-end",
            marginTop: 22,

        },
        modalView: {
            height: 70,
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: "#39403b",
            borderRadius: 20,
            paddingHorizontal: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
        buttonOpen: {
            backgroundColor: "#F194FF",
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            textAlign: "center",
            color: "#fff",
            fontFamily: "InterRegular"
        }
    })