/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BoxOffice from './src/pages/BoxOffice';
import MovieDetail from './src/pages/MovieDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleList from './src/pages/PeopleList';
import PeopleDetail from './src/pages/PeopleDetail';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='/' component={BoxOffice} options={{ headerShown: false }} />
          <Stack.Screen name='/movie' component={MovieDetail}/>
          <Stack.Screen name='/people-list' component={PeopleList}/>
          <Stack.Screen name='/people-detail' component={PeopleDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
