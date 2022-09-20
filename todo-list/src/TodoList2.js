import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function TodoList2() {
    const [ list, setList ] = useState( [] );

    const addItem = () => {
        setList( [ ...list, {} ] );
    }

    const update = ( key, isDone ) => {
        const index = list.findIndex( element => element.key === key );
    }

    useEffect(() => {
        AsyncStorage.setItem( 'list', JSON.stringify( list ) );
    }, [list])

    return (
        ''
    )
}