import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Host, CircularProgressIndicator, Text } from '@expo/ui/jetpack-compose';
import { useGlobalContext } from '@/contexts/GlobalContext';

var altura, largura = 0

export default function CircularProgress() {
    const { width, height } = useWindowDimensions();
    const { loading } = useGlobalContext();

    if (!loading) return null;

    // Define o tamanho do indicador (largura/altura iguais)
    const TAMANHO_INDICADOR = 150; // Ajuste este valor para o tamanho desejado

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            width: 300,
            height: 300,
            position: 'absolute',
            borderRadius: 10,
            zIndex: 9999,
            top: (height / 2) - (300 / 2), // Centraliza verticalmente
            left: (width / 2) - (300 / 2), // Centraliza horizontalmente
        },
    });
    return (
        <Host style={styles.container}>
            <CircularProgressIndicator
                title={'Aguarde...'}
                visible={true}
                color="#AD50EC"
                zIndex={2}
                size={48}
                strokeWidth={20}
            />
        </Host>
    );
}
