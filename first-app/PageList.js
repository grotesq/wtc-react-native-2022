import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';

export default function PageList() {
  const navigation = useNavigation();
  return(
    <View>
      <Header title="페이지 목록"/>
      <Button title="로또 번호 생성기" onPress={ () => {
        navigation.navigate( '/lotto-generator' );
      } }/>
      <Button title="시계 화면" onPress={ () => {
        navigation.navigate( '/clock' );
      } }/>
    </View>
  )
}
