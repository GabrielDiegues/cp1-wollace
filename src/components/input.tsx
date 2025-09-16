import { GlobalStyles } from "@/app/styles/globalStyles";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";


type InputProps = {
    title: string;
    msg: string;
    userInput: string;
    onChangeText: (text: string) => void;
    hideEntry?: boolean;
}


export default function Input({title, msg, userInput, onChangeText, hideEntry}: InputProps) {
    return (
        <View style={localStyles.fieldsContainer}>
            <Text style={[GlobalStyles.inputTitle, {paddingTop: Dimensions.get('window').height / 10}]}>{title}</Text>
            <TextInput
            style={GlobalStyles.borderProps}
                onChangeText={onChangeText}
                value={userInput}
                placeholder={msg}
                placeholderTextColor="white"
                secureTextEntry={hideEntry}
            />
        </View>
    )
}


const localStyles = StyleSheet.create({
    fieldsContainer: {
        alignItems: 'center',
    },
    
})
