import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { DateTime } from 'luxon';
import tw from 'twrnc';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import key from '../config/key';

export default function BoxOffice() {
    const [list, setList] = useState([]);
    const [date, setDate] = useState( DateTime.now().minus({ days: 1 }) );
    const navigation = useNavigation();
    useEffect(()=>{
        let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}`;
        url += `&targetDt=${date.toFormat( 'yyyyLLdd' )}`;
        axios.get( url )
            .then( response => {
                setList( response.data.boxOfficeResult.dailyBoxOfficeList );
                /*
                    {
                        "audiAcc": "4833218",
                        "audiChange": "-70.5",
                        "audiCnt": "100744",
                        "audiInten": "-241122",
                        "movieCd": "20215601",
                        "movieNm": "공조2: 인터내셔날",
                        "openDt": "2022-09-07",
                        "rank": "1",
                        "rankInten": "0",
                        "rankOldAndNew": "OLD",
                        "rnum": "1",
                        "salesAcc": "49864717753",
                        "salesAmt": "1000888999",
                        "salesChange": "-71.9",
                        "salesInten": "-2566280034",
                        "salesShare": "73.4",
                        "scrnCnt": "2098",
                        "showCnt": "9275"
                    }
                */
            } )
            .catch( error => {
                console.warn( error );
            } );
    },[date]);

    return (
        <View style={tw`p-4`}>
            <Text style={tw`text-2xl font-bold text-center mb-4`}>Box Office</Text>

            <View style={tw`flex-row items-center justify-between mb-8`}>
                <Pressable onPress={()=>{
                    setDate( date.minus({ days: 1 }) )
                }}>
                    <Text style={tw`text-lg font-bold`}>이전</Text>
                </Pressable>
                <Text style={tw`text-xl font-bold`}>{ date.toFormat( 'yyyy-LL-dd' ) }</Text>
                <Pressable onPress={()=>{
                    setDate( date.plus({ days: 1 }) )
                }}
                >
                    <Text style={tw`text-lg font-bold`}>다음</Text>
                </Pressable>
            </View>

            { list.map( item => (
                <Pressable key={ item.movieCd } onPress={()=>{
                    navigation.navigate( '/movie', { movieCd: item.movieCd } );
                }}>
                    <View style={tw`flex-row mb-2`}>
                        <Text style={tw`mr-2 font-bold`}>{ item.rank }</Text>
                        <Text>{ item.movieNm }</Text>
                        <Text style={tw`ml-1 text-red-500`}>{ item.rankOldAndNew === 'NEW' ? 'N' : '' }</Text>
                    </View>
                </Pressable>
            ) ) }
        </View>
    )
}