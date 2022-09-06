import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <View style={{
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#e5e5e5',
      borderBottomWidth: 1,
    }}>
      <View>
        { navigation.canGoBack() && (
          <Pressable onPress={() => navigation.goBack() }>
            <Text>&lt; 뒤로</Text>
          </Pressable>
        ) }
      </View>
      <Text>{title}</Text>
      <View></View>
    </View>
  )
}
