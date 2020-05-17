import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const StackNavigation = createStackNavigator();

import MainPage from './pages/Main';
import NewFilePage from './pages/NewFile';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator headerMode="none">
        <StackNavigation.Screen name="MAIN" component={MainPage} />
        <StackNavigation.Screen name="NEW_FILE" component={NewFilePage} />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
