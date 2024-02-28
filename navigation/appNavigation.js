import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import Home from '../src/components/Home';


const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non serializable values were found in navigation state',
]);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}