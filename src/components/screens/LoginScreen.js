import { useGlobalContext } from '@/contexts/GlobalContext';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import HomeScreen from '@/components/screens/HomeScreen';
import { useRouter } from 'expo-router';

const currentYear = new Date().getFullYear();

export default function LoginScreen() {
    const { username, password, setUsername, setPassword, user, setUser, homeScreen, setHomeScreen } = useGlobalContext();
    const [inputHeight, setInputHeight] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    console.log('username:', username, 'password:', password);
    const router = useRouter();
    if(homeScreen){
        
        //return <HomeScreen/>
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={[{ flex: 1, width: '100%', }]}
                contentContainerStyle={[{ flexGrow: 1, height: '110%' }, styles.container]}
            >
                <View style={styles.divsLogin}>
                    <Image
                        source={require('../../../assets/images/image-bottom.png')}
                        style={styles.backgroundImage}
                        resizeMode="stretch"
                    />
                </View>
                <View style={styles.divsLogin}>
                    <View style={[styles.viewFields]}>
                        <Text style={styles.text}>Nome de Usuário:</Text>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder={`Digite seu nome de usuário (usuario ≠ \nUsuario ≠ USUARIO)`}
                            style={[styles.inputText]}
                        />
                    </View>
                    <View style={[styles.viewFields]}>
                        <Text style={styles.text}>Senha:</Text>
                        <View style={styles.passwordRow}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder={`Digite sua senha (senha ≠ \nSenha ≠ SENHA)`}
                                style={[styles.inputText, {paddingLeft: 50}]}
                                onLayout={(event) => {
                                    const { height } = event.nativeEvent.layout;
                                    setInputHeight(height);
                                }}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword((s) => !s)}
                                style={{ height: inputHeight, width: 75, marginTop: - (inputHeight), marginLeft: 4, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}
                                accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={inputHeight} color="black" />
                            </TouchableOpacity>
                            <Button title="TESTE" onPress={() => {router.replace('/(tabs)/thirdscreen'); }}/>
                        </View>
                    </View>
                </View>
                <View style={styles.divsLogin}>
                    <Image
                        source={require('../../../assets/images/my-logo.png')}
                        style={styles.backgroundImage}
                        resizeMode="stretch"
                    />
                </View>
                <Text style={{ color: 'white', marginTop: 5 }}>© {currentYear} Leandro Santos de Carvalho.</Text>
                <Text style={{ color: 'white', marginBottom: 5 }}>Todos os direitos reservados.</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 2,
    },
    firstBox: {
        flex: 1,
        width: '100%',
        height: '33%',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 10,
        marginTop: 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    overlayText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    divsLogin: {
        flex: 1,
        width: '100%',
        height: '33%',
        alignSelf: 'center',
        padding: 12,
        borderWidth: 4,
        textColor: 'white',
        borderColor: 'white',
        backgroundColor: 'black',
        borderRadius: 10,
        margin: 4,
    },
    inputText: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: 8,
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    viewFields: {
        marginBottom: 10
    }
})