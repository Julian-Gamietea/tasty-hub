import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Register } from './register/Register';
import { ButtonCustom } from './shared-components/ButtonCustom';
import { InputTasty } from './shared-components/InputTasty';


export default function App() {
  return (
      <View style ={{flex:1, alignItems:'stretch'}}>
        <Register/>
        
      </View>
        
        
  );
}


