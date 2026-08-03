import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Host, CircularProgressIndicator } from '@expo/ui/jetpack-compose';
import { useGlobalContext } from '@/contexts/GlobalContext';

export default function CircularProgress() {
    const { width, height } = useWindowDimensions();
    const { loading } = useGlobalContext();

    if (!loading) return null;

    // Define o tamanho do indicador (largura/altura iguais)
    const TAMANHO_INDICADOR = 150; // Ajuste este valor para o tamanho desejado

    return (
        <Host
            style={[
                //StyleSheet.absoluteFillObject, // Ocupa a tela inteira (top:0, left:0, right:0, bottom:0)
                {
                    flex: 1,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999, // Garante que fique por cima de outros elementos
                },
            ]}
        >
            <CircularProgressIndicator
                style={{
                    width: TAMANHO_INDICADOR,
                    height: TAMANHO_INDICADOR,
                    zIndex: 1000,
                    top: width / 2 - TAMANHO_INDICADOR / 2,
                    left: height / 2 - TAMANHO_INDICADOR / 2,
                }}
                visible={loading}
                color="blue"
            />
        </Host>
    );
}