import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  useEffect(() => {
    // Força a splash screen a sumir assim que o layout raiz for montado
    SplashScreen.hideAsync().catch(() => {
      /* ignora erros caso já tenha fechado */
    });
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tela de Login */}
      <Stack.Screen name="index" />

      {/* Grupo de Abas (será carregado sem mostrar a barra do Stack) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}