import { useGlobalContext } from '@/contexts/GlobalContext';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
const router = useRouter();


export default function ThirdScreen() {
    return (
        <View style={styles.container}>
            <Text>Terceira Tela</Text>
            <Button title="Voltar para Login" onPress={() => { router.replace('/'); }} />
        </View>
    )
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