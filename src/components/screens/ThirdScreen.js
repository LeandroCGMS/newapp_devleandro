import { useGlobalContext } from '@/contexts/GlobalContext';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import LoginScreen from './LoginScreen';
import { GlobalProvider } from '@/contexts/GlobalContext';


export default function ThirdScreen() {
    const router = useRouter();
    const [showLogin, setShowLogin] = useState(false);
    if(!showLogin) {
    return (
        <View style={styles.container}>
            <Text>Terceira Tela</Text>
            <Button title="Voltar para Login" onPress={() => { setShowLogin(true); }} />
        </View>
    )} else {
        router.navigate('/');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 2,
    },

})