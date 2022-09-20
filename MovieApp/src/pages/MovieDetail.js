import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import tw from 'twrnc';
import key from '../config/key';

export default function MovieDetail() {
    const route = useRoute();
    const [ data, setData ] = useState();
    const navigation = useNavigation();
    useFocusEffect(useCallback(()=>{
        let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${key}`
        url += `&movieCd=${route.params.movieCd}`;

        axios.get( url )
            .then( response => {
                console.log( response.data );
                setData( response.data );
            } )
            .catch( error => {
                console.warn( error );
            } );
    },[route.params.movieCd]))
    return (
        <View>
            <View style={ tw`flex-row` }>
                <Text>제목 : </Text>
                <Text>{ data?.movieInfoResult?.movieInfo?.movieNm }</Text>
            </View>
        
            <View style={ tw`flex-row` }>
                <Text>배우 : </Text>
                <View style={tw`flex-row flex-wrap flex-1`}>
                    {data?.movieInfoResult?.movieInfo?.actors.map( actor=>(
                        <Pressable key={actor.peopleNm} onPress={()=>{
                            navigation.navigate( '/people-list', { peopleNm: actor.peopleNm } )
                        }}>
                            <Text style={tw`mr-1 mb-1`}>{ actor.peopleNm }</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            
            {/* <Text>{ JSON.stringify( data ) }</Text> */}
        </View>
    )
}