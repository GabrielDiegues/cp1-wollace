import { windowHeight, windowWidth } from "@/utils/windowDimensions";
import { Dimensions, StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    libraryContainer: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: windowHeight / 20,
    },
    inputTitle: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#AD0177',
    },
    pageTitle: {
        fontSize: 31,
        fontWeight: 'bold',
        color: '#AD0177',
    },

    libraryTitle: {
        fontSize: 31,
        fontWeight: 'bold',
        color: '#AD0177',
        textAlign: 'center',
    },

    libraryTitleContainer: {
        paddingTop: windowHeight / 40,
    },
    borderProps: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        maxWidth: windowWidth / 2,
        color: 'white',
    }
});

export {GlobalStyles}