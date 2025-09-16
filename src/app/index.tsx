import Input from '@/components/input';
import { Student } from '@/types';
import {DefaultStudent, updateStudentProp}  from '@/utils/studentUtil';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from './styles/globalStyles';
import BaseButton from '@/components/baseButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentsFileResponse } from '@/types/types';
import {screenAlert, checkApiErrors } from '@/utils/displayMessages';
import { api } from '@/server/api';
import { isAxiosError } from 'axios';
import { windowWidth } from '@/utils/windowDimensions';


export default function Login() {
  // Inner variables
  const router = useRouter();
  const [student, setStudent] = useState({... DefaultStudent});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  let isDisabled = (!student.userName || !student.password) || isLoggingIn;

  // Inner functions
  const onChangeText = (propertie: keyof Student) => (newUsername: string) => setStudent(updateStudentProp(propertie, newUsername.trim()))


  const checkLogin = async () => {
    setIsLoggingIn(true);
    try {
      await api.post("/students/signIn", student);
      AsyncStorage.setItem("student", JSON.stringify(student));
      router.replace('/booksMenu')
    }
    catch(error) {
      checkApiErrors(error, "Sign in error", "Error signing in, please try again later");
    }
    setIsLoggingIn(false);
  }


  const createAccount = async() => {
    try {
      const response = await api.post("/students/createStudent", student);
      screenAlert("Account creation succeeded", `${response.data}`);
    }
    catch(error) {
      checkApiErrors(error, "Account creation error", "Error creating the account, please try again later");
    }
  }
  return (
    <View style={GlobalStyles.loginContainer}>

      <Text style={GlobalStyles.pageTitle}>FIAP</Text>
      <Input
        title="User name"
        msg="Type your user name"
        userInput={student.userName}
        onChangeText={onChangeText('userName')}
      />

      <Input
        title="Password"
        msg="Type your password"
        userInput={student.password}
        onChangeText={onChangeText("password")}
        hideEntry={true}
      />
      <View style={[{paddingTop: 40}]}>
        <BaseButton
          buttonTitle="Sign in"
          buttonStyle={localStyle.buttonContainer}
          onPress={checkLogin}
          isDisabled={isDisabled}
        />

        <BaseButton
          buttonTitle="Sign up"
          buttonStyle={[localStyle.buttonContainer, {backgroundColor: 'black', borderWidth: 1, borderColor: '#AD0177'}]}
          onPress={createAccount}
          isDisabled={isDisabled}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const localStyle = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
    backgroundColor: '#AD0177',
    borderRadius: 10,
    width: windowWidth / 1.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})