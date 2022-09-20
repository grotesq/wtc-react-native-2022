import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import key from '../config/key';

export default function PeopleList() {
    const route = useRoute();
    const peopleNm = route.params.peopleNm;
    const [ list, setList ] = useState([]);
    const navigation = useNavigation();
    useFocusEffect(useCallback(()=>{
        let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=${key}`;
        url += `&peopleNm=${peopleNm}`;
        axios.get(url)
            .then( response => {
                setList( response.data.peopleListResult.peopleList );
            } )
            .catch( error => {
                console.warn( error );
            } );
    },[peopleNm]));
    return (
        <View>
            { list.map( people => (
                <Pressable key={ people.peopleCd } onPress={()=>{
                    navigation.navigate( '/people-detail', { peopleCd: people.peopleCd } );
                }}>
                    <Text>{ people.peopleNm } ({people.repRoleNm})</Text>
                </Pressable>
            ))}
        </View>
    )
}