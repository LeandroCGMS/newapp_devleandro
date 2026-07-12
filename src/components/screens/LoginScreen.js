import { useGlobalContext } from '@/contexts/GlobalContext';
import { TextInput, View, Text, Button } from 'react-native';

export default function LoginScreen() {
    const { username, password, setUsername, setPassword, user, setUser } = useGlobalContext();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login Screen</Text>
        </View>
    )
}