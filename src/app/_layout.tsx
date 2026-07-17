import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tela de Login */}
      <Stack.Screen name="index" /> 
      
      {/* Grupo de Abas (será carregado sem mostrar a barra do Stack) */}
      <Stack.Screen name="(tabs)" /> 
    </Stack>
  );
}