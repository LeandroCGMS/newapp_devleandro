import { useGlobalContext } from '@/contexts/GlobalContext';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef } from 'react';
import Feather from '@expo/vector-icons/Feather';
import HomeScreen from '@/components/screens/HomeScreen';
import { useRouter } from 'expo-router';
// Exemplo em qualquer tela (ex: app/index.tsx)
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import WebViewGoogleRecaptcha from '@/components/utils/WebViewGoogleRecaptcha';
import { handleGenerateRecaptcha } from '@/components/utils/WebViewGoogleRecaptcha';
import { getJWT, getUserData } from '@/components/utils/functions';
import CircularProgress from '@/components/utils/CircularProgress';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { dispararToastSucesso, dispararToastErro } from '@/components/utils/functions';

const currentYear = new Date().getFullYear();
var token = null


export default function LoginScreen() {
    const { username, password, setUsername, setPassword, user, setUser,
        homeScreen, setHomeScreen, loading, setLoading } = useGlobalContext();
    const [inputHeight, setInputHeight] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    if (homeScreen) {

    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                pointerEvents={loading ? 'none' : 'auto'}
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
                    <ScrollView>
                        <View style={[styles.viewFields]}>
                            <Text fontSize={12} style={styles.text}>Nome de Usuário:</Text>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder={`usuario ≠ Usuario ≠ USUARIO`}
                                maxLength={20}
                                style={[styles.inputText]}
                                fontSize={12}
                            />
                        </View>
                        <View style={[styles.viewFields]}>
                            <Text style={styles.text}>Senha:</Text>
                            <View style={styles.passwordRow}>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder={`senha ≠ Senha ≠ SENHA`}
                                    style={[styles.inputText, { paddingLeft: 50 }]}
                                    onLayout={(event) => {
                                        const { height } = event.nativeEvent.layout;
                                        setInputHeight(height);
                                    }}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    maxLength={20}
                                    fontSize={12}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword((s) => !s)}
                                    style={{ backgroundColor: showPassword ? '#EE4B2B' : '#AAFF00', borderColor: 'gray', height: inputHeight, width: 75, marginTop: - (inputHeight), marginLeft: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}
                                    accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    <Feather style={{}} name={showPassword ? 'eye-off' : 'eye'} size={inputHeight} color="black" />
                                </TouchableOpacity>
                                <View style={{ marginBlock: 2 }}>
                                    <TouchableOpacity
                                        textAllCaps='none'
                                        uppercase='none'
                                        style={styles.pressable1}
                                        onPress={async () => {
                                            const googleTokens = []
                                            setLoading(true)
                                            dispararToastSucesso('Autenticando', 'Aguarde alguns segundos...', 3000)
                                            if(username?.length < 3 || password?.length < 3) {
                                                dispararToastErro('Nome de Usuário ou Senha Inválidos', 'Nome de usuário e senha não podem ter menos que 3 caracteres.', 3000)
                                                setLoading(false)
                                                return
                                            }
                                            googleTokens.push(await handleGenerateRecaptcha()) // retorna objeto de resposta do Recaptcha Google V3
                                            googleTokens.push(await handleGenerateRecaptcha())
                                            if (!googleTokens[0]) {
                                                // mensagem de que não foi possível gerar o token do Google Recaptcha, e que o usuário deve tentar novamente
                                            }
                                            const jwt = await getJWT(username, password, googleTokens[0].nativeEvent.data) // retorna response.json() ou false
                                            const keyAccess = jwt?.access || null
                                            const userData = await getUserData(keyAccess, googleTokens[1].nativeEvent.data) // retorna response.json() ou false
                                            setLoading(false)
                                            setUser({ backendUser: userData, googleUser: undefined })
                                            userData?.error == undefined ? router.replace('/(tabs)/thirdscreen') : dispararToastErro('Erro ao autenticar', 'Verifique seus dados e tente novamente. Se estiverem corretos, contacte o suporte.', 3000)
                                        }} >
                                        <Entypo style={{ marginRight: 2 }} name="login" size={24} color="black" />
                                        <Text fontSize={12} style={styles.textPressable1}>Autenticar no App</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.googleButton} onPress={() => {

                                    }} >
                                        <AntDesign name="google" size={24} color="black" style={{ marginRight: 2 }} />
                                        <Text fontSize={12} style={styles.googleButtonText}>Autenticar com Google</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <WebViewGoogleRecaptcha />
                    </ScrollView>
                </View>
                <View style={styles.divsLogin}>
                    <Image
                        source={require('../../../assets/images/my-logo.png')}
                        style={styles.backgroundImage}
                        resizeMode="stretch"
                    />
                </View>
                <Text fontSize={12} style={{ color: 'white', marginTop: 5 }}>© {currentYear} Leandro Santos de Carvalho.</Text>
                <Text fontSize={12} style={{ color: 'white', marginBottom: 5 }}>Todos os direitos reservados.</Text>
            </ScrollView>
            <CircularProgress />
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    divsLogin: {
        flex: 1,
        width: '100%',
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
        fontSize: 12
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    viewFields: {
        marginBottom: 10
    },
    buttons: {
        margin: 5
    },
    pressable1: {
        flexDirection: 'row',
        backgroundColor: '#6d0b5d', // Cor padrão do Button no Android
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBlock: 5,
        height: 50
    },
    textPressable1: {
        textTransform: 'none', // Desativa a transformação de texto para maiúsculas
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    },
    googleButton: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    googleButtonText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
    },
})