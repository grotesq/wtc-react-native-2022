import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import key from '../config/key';

export default function PeopleDetail() {
    const route = useRoute();
    const peopleCd = route.params.peopleCd;
    const [ data, setData ] = useState();
    const navigation = useNavigation();
    useFocusEffect(useCallback(()=>{
        let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?key=${key}`
        url += `&peopleCd=${peopleCd}`;
        axios.get( url )
            .then( response => {
                setData( response.data.peopleInfoResult.peopleInfo );
            } )
            .catch(error => {
                console.warn(error);
            })
    },[]));
    return (
        <View>
            <Text>이름 : {data?.peopleNm }</Text>
            <Text>역할 : {data?.repRoleNm }</Text>
            <Text>- 작품 리스트</Text>
            {data?.filmos.map( film => (
                <Pressable key={ film.movieCd } onPress={()=>{
                    navigation.navigate( '/movie', { movieCd: film.movieCd } );
                }}>
                    <Text>{ film.movieNm }</Text>
                </Pressable>
            ))}
        </View>
    )
}