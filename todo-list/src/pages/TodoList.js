import React, { useEffect, useState } from "react";
import { Button, FlatList, Pressable, SafeAreaView, ScrollView, Switch, Text, TextInput, View } from "react-native";
import Row from "../components/Row";
import { addItem, getItems, remove, update } from "../storage";
import styled from 'styled-components/native';

export default function TodoList() {
    const [ list, setList ] = useState([]);
    const [ content, setContent ] = useState( '' );
    useEffect(()=>{
        getItems()
            .then( list => setList( list ) );
    },[]);
    return (
        <SafeAreaView style={{ flex:1 }}>
            <Title>할 일 목록</Title>
            {/* <ScrollView style={{ flex: 1 }}>
                { list.map( item => (
                    <Row key={ item.key } style={{ marginBottom: 8 }}>
                        <Switch style={{ marginLeft: 12 }}
                            value={ item.isDone }
                            onChange={ () => {
                                update( item.key, !item.isDone )
                                    .then( list => setList( list ) );
                            } }
                        />
                        <Content>
                            { item.content }
                        </Content>
                        <Pressable onPress={()=>{
                            remove( item.key )
                                .then( list => setList( list ) );
                        }}>
                            <Text style={{ marginRight: 12 }}>🗑</Text>
                        </Pressable>
                    </Row>
                ))}
            </ScrollView> */}

            <FlatList style={{ flex: 1 }} data={ list } renderItem={({item}) => (
                <Row key={ item.key } style={{ marginBottom: 8 }}>
                    <Switch style={{ marginLeft: 12 }}
                        value={ item.isDone }
                        onChange={ () => {
                            update( item.key, !item.isDone )
                                .then( list => setList( list ) );
                        } }
                    />
                    <Content>
                        { item.content }
                    </Content>
                    <Pressable onPress={()=>{
                        remove( item.key )
                            .then( list => setList( list ) );
                    }}>
                        <Text style={{ marginRight: 12 }}>🗑</Text>
                    </Pressable>
                </Row>
            )} />

            <Row>
                <Input
                    value={ content }
                    onChangeText={ setContent }
                />
                <Button title="추가" onPress={()=>{
                    addItem( content )
                        .then( list => {
                            setList( list );
                            setContent( '' );
                        } )
                }}/>
            </Row>
        </SafeAreaView>
    )
}

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 12px;
`

const Content = styled.Text`
    flex: 1;
    padding: 0 12px;
`;

const Input = styled.TextInput`
    border-bottom: 1px solid gray;
    flex: 1;
    margin-left: 12px;
`;
