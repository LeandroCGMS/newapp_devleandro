import { useGlobalContext } from '@/contexts/GlobalContext';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const currentYear = new Date().getFullYear();

export default function LoginScreen() {
    const { username, password, setUsername, setPassword, user, setUser } = useGlobalContext();
    console.log('username:', username, 'password:', password);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={[{ flex: 1, width: '100%' }]}
                contentContainerStyle={[{ flexGrow: 1 }, styles.container]}
            >
                <View style={styles.firstBox}>
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
                            placeholder="Digite seu nome de usuário"
                            style={[styles.inputText]}
                        />
                    </View>
                    <View style={[styles.viewFields]}>
                        <Text style={styles.text}>Senha:</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Digite sua senha"
                            style={[styles.inputText]}
                            secureTextEntry

                        />
                    </View>
                </View>
                <View style={styles.divsLogin}>
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
        color: 'black'
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    viewFields: {
        marginBottom: 10
    }
})