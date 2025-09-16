import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const path = '/' + segments.join('/')
        AsyncStorage.setItem("lastPath", path);
    }, [segments]);


    useEffect(() => {
        const restorePath = async () => {
            const lastPath = await AsyncStorage.getItem("lastPath");
            if(lastPath) {
                router.replace(lastPath as '/' | '/booksMenu');
            }
        }
        restorePath();
    }, [])

    return <Stack
        screenOptions={{
            headerShown: false,
        }} 
    />
}