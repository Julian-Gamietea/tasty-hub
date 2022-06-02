import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from './register/Register';
import { LandingPage } from './landing-page/LandingPage';
import { EmailSent } from './register/EmailSent';
import {InsertCode} from './restore-password/InsertCode'
import {InsertMail} from './restore-password/InsertMail'
import {InsertNewPassword} from './restore-password/InsertNewPassword'

import { SignIn } from './sign-in/SignIn';
import { EnterData } from './register/EnterData';
import { EnterAvatar } from './register/EnterAvatar';
import { RegisterSuccess } from './register/RegisterSuccess';
import { Dashboard } from './dashboard/Dashboard';
import { ExistingMail } from './register/ExistingMail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={LandingPage}/>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EmailSent" component={EmailSent}/>
          <Stack.Screen name="InsertCode" component={InsertCode}/>
          <Stack.Screen name="InsertMail" component={InsertMail}/>
          <Stack.Screen name="InsertNewPassword" component={InsertNewPassword}/>
          <Stack.Screen name="EnterData" component={EnterData}/>
          <Stack.Screen name="EnterAvatar" component={EnterAvatar}/>
          <Stack.Screen name="RegisterSuccess" component={RegisterSuccess}/>
          <Stack.Screen name="RestorePassword" component={InsertMail}/>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ExistingMail" component={ExistingMail} />
          {/* habría que ir agregando las screens aca */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


