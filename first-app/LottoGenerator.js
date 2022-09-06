import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import _ from 'lodash';
import Header from './components/Header';

export default function LottoGenerator() {
  const [ numbers, setNumbers ] = useState([]);
  const getNumbers = useCallback(()=>{
    let numbers = _.times( 45, n => n + 1 );
    numbers = _.shuffle( numbers );
    numbers.length = 6;
    setNumbers( numbers );
  },[]);

  useEffect(()=>{
    getNumbers();
  },[])

  return (
    <View>
      <Header title="로또 번호 생성기"/>
      <Text>로또 번호 생성기</Text>
      <Text>{ numbers.join( ',' ) }</Text>
      <Button title="새로고침" onPress={ getNumbers } />
    </View>
  )
}
