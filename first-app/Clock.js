import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DateTime } from 'luxon';
import Header from './components/Header';

export default function Clock() {
  const [ datetime, setDatetime ] = useState( DateTime.now() );

  useEffect(()=>{
    const id = setInterval( () => {
      setDatetime( DateTime.now() );
    }, 1000 );

    return () => {
      clearInterval( id );
    }
  },[]);

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1, width: '100%', background: '#fff' }}>
        <Header title="시계 화면"/>
      </View>
      <Image style={ styles.background } source={{ uri: 'https://placeimg.com/640/480/nature' }} />
      <View style={styles.container}>
        <Text style={ styles.typo }>{ datetime.toFormat( 'yyyy-MM-dd') }</Text>
        <Text style={ styles.typo }>{ datetime.toFormat( 'HH:mm:ss') }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  typo: {
    fontSize: 36,
    fontWeight: 'bold',
    backgroundColor: 'rgba( 255, 255, 255, 0.6 )',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  }
});

// styles.container
