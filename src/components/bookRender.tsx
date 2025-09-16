import { Book, Student } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import BaseButton from "./baseButton";
import { windowWidth } from "@/utils/windowDimensions";
import { GlobalStyles } from "@/app/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkApiErrors, screenAlert } from "@/utils/displayMessages";
import { useRouter } from 'expo-router';
import { api } from "@/server/api";
import { isAxiosError } from "axios";
import { useState } from "react";


export default function BookRender({book}: {book: Book}) {
  // Inner variables
  const router = useRouter();
  const [isBorrowing, setIsBorrowing] = useState(false);

  // Inner functions
const borrowBook = async () => {
  setIsBorrowing(true);
  const data = await AsyncStorage.getItem("student");
  const student: Student =  data ? JSON.parse(data) : null;
  if(student !== null) {
    student.borrowedBooks.push(book);
    try{
      await api.patch(`/books/borrow?id=${book.id}`);
      await api.patch("/students/addBook", student);
      screenAlert("Book borrowed", "Book has been borrowed successfuly");
    }
    catch(error) {
      checkApiErrors(error, "Book borrowing error", "Please, try again later");
    }
  }
  else {
    screenAlert("Session expired", "Please log in again");
    router.replace("/");
  }
  setIsBorrowing(false); 
}



  return (
      <View style={localStyles.pageContainer}>
        <View style={localStyles.bookContainer}>
          <Text style={[localStyles.bookTitle, localStyles.bookTextColor]}>{book.title}</Text>
          <Text style={[localStyles.bookAuthor, localStyles.bookTextColor]}>Author: {book.author}</Text>
          <Text style={[localStyles.bookSynopsis, localStyles.bookTextColor]}>{book.synopsis}</Text>
            <BaseButton
                buttonTitle="Borrow"
                buttonStyle={localStyles.buttonContainer}
                onPress={borrowBook}
                isDisabled={isBorrowing}
            />
        </View>
      </View>
  )
}


const localStyles = StyleSheet.create({
  pageContainer: {
    paddingLeft: 30,
  },
  buttonContainer: {
    backgroundColor: '#AD0177',
    borderRadius: 10,
    width: windowWidth / 5,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bookContainer: {
    paddingTop: 30,
  },
  bookTextColor: {
    color: '#F2E6E9',
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 20,
  },
  bookSynopsis: {
    fontSize: 15,
  }
})
