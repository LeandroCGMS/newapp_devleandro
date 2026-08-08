import * as Device from 'expo-device';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlobalProvider } from '@/contexts/GlobalContext';
import LoginScreen from '@/components/screens/LoginScreen';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Configuração para permitir linhas ilimitadas
const toastConfig = {
  /* Estilo para toques de Sucesso */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', height: 'auto', minHeight: 60, paddingVertical: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={0} // 👈 0 significa sem limite de linhas
      text2NumberOfLines={0} // 👈 Exibe todo o texto da mensagem
      text1Style={{ fontSize: 16, fontWeight: 'bold' }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  /* Estilo para toques de Erro */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545', height: 'auto', minHeight: 60, paddingVertical: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={0} // 👈 0 significa sem limite de linhas
      text2NumberOfLines={0} // 👈 Exibe todo o texto da mensagem
      text1Style={{ fontSize: 16, fontWeight: 'bold' }}
      text2Style={{ fontSize: 14 }}
    />
  ),
};

export default function HomeScreen() {
  return (
    <GlobalProvider>
      <LoginScreen />
      <Toast config={toastConfig} />
    </GlobalProvider>

  )
}
