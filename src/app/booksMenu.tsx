import { FlatList, Text, View } from "react-native";
import { GlobalStyles } from "./styles/globalStyles";
import BookRender from "@/components/bookRender";
import { useEffect, useState } from "react";
import { api } from "@/server/api";
import { Book } from "@/types";
import { checkApiErrors } from "@/utils/displayMessages";


export default function BooksMenu() {
    // Inner variables
    const [books, setBooks] = useState<Book[]>([{id: 1, title: "hi", author: "test", synopsis: "a good book", borrowed: false}]);


    // Inner Functions
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const {data} = await api.get("/books/available");
                setBooks(data);
            }
            catch(error) {
                checkApiErrors(error, "Available books error", "Couldn't load the available books, please try again later");
            }
        }
        fetchBooks();
    }, [])


    return (
        <View style={GlobalStyles.libraryContainer}>
            <View style={GlobalStyles.libraryTitleContainer}>
                <Text style={GlobalStyles.libraryTitle}>Virtual Library</Text>
            </View>
            
        <FlatList
            data={books}
            renderItem={({item}) => <BookRender book={item}/>}
        />

        </View>
    )
}