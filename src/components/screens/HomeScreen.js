import { useGlobalContext } from '@/contexts/GlobalContext';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import ThirdScreen from '@/components/screens/ThirdScreen';
import FourthScreen from '@/components/screens/FourthScreen';

export default function HomeScreen() {
    return (
        <Stack
            // See React Navigation documentation for more information on available screenOptions: https://reactnavigation.org/docs/headers/#sharing-common-options-across-screens
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            {/* Optionally configure static options outside the route.*/}
            <Stack.Screen name="thirdscreen" />
            {/* <Stack.Screen name="FourthScreen" component={FourthScreen} /> */}
        </Stack>
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