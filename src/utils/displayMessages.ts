import { isAxiosError } from 'axios';
import { Alert } from 'react-native';

const screenAlert = (title: string, description: string) => {
    Alert.alert(
        `${title}`,
        `${description}`,
        [
            {text: 'close'},
        ],
        {cancelable: true}
    );
};

const checkApiErrors = (error: any, errorTitle: string, serverError: string) => {
    if(isAxiosError(error)) {
        screenAlert(errorTitle, error.response?.data);
        screenAlert("test", error.message);
    }
    else {
    screenAlert(errorTitle, serverError);
    }
}

export {screenAlert, checkApiErrors};
