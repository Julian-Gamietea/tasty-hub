import React from 'react';
import {View, Text} from 'react-native';


export const Dashboard = ({route, navigation}) => {
    const user = route.params;
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{user.id}</Text>
            <Text>{user.email}</Text>
            <Text>{user.name}</Text>
            <Text>{user.role}</Text>
            <Text>{user.enabled}</Text>
        </View>
    );
}