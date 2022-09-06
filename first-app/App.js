import * as React from 'react';
import { SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PageList from './PageList';
import LottoGenerator from './LottoGenerator';
import Clock from './Clock';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="/page-list" component={ PageList } options={{ title: '페이지 목록' }} />
          <Stack.Screen name="/lotto-generator" component={ LottoGenerator } options={{ title: '로또 번호 생성기' }}  />
          <Stack.Screen name="/clock" component={ Clock } options={{ title: '시계 화면' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
