import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppScreen1 from './screen1';
import AppScreen2 from './screen2';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={AppScreen1} />
        <Stack.Screen name="Screen2" component={AppScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
