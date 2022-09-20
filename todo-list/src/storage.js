import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItems() {
    try {
        const items = await AsyncStorage.getItem( 'todo-list' );
        if( !items ) {
            return [];
        }
        return JSON.parse( items );
    }
    catch {
        return [];
    }
}

export async function addItem( content ) {
    const data = {
        key: new Date().getTime().toString(),
        content,
        isDone: false,
    };
    const items = await getItems();
    items.push( data );
    AsyncStorage.setItem( 'todo-list', JSON.stringify( items ) );
    return items;
}

export async function update( key, isDone ) {
    const items = await getItems();
    const index = items.findIndex( element => element.key === key );
    if( index === -1 ) return;
    items[ index ].isDone = isDone;
    AsyncStorage.setItem( 'todo-list', JSON.stringify( items ) );
    return items;
}

export async function remove( key ) {
    const items = await getItems();
    const filtered = items.filter( element => element.key !== key );
    AsyncStorage.setItem( 'todo-list', JSON.stringify( filtered ) );
    return filtered;
}
