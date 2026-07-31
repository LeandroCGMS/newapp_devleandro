import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

let webViewRef = null;
export const handleGenerateRecaptcha = () => {
    if (webViewRef.current) {
        webViewRef.current.injectJavaScript('executeRecaptcha(); true;');
    }
};

export default function WebViewGoogleRecaptcha() {
    const { googleToken, setGoogleToken } = useGlobalContext();
    webViewRef = useRef(null);
    return (
        <View style={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}>
            <WebView style={{ flex: 1, width: 0, height: 0, borderWidth: 2, borderColor: 'white', display: 'flex' }}
                ref={webViewRef} // <-- Atribua a ref aqui
                source={require('../../../assets/html/recaptcha.html')}
                onConsoleMessage={(event) => {
                    const { message, lineNumber, sourceId } = event.nativeEvent;
                    console.log(`[WebView Console] ${message} (Linha ${lineNumber})`);
                }}
                // Intercepta erros de rede ou falha ao carregar scripts
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('Erro no carregamento da WebView: ', nativeEvent);
                }}
                onMessage={(response) => {
                    const tokenResponsed = response.nativeEvent.data;
                    setGoogleToken(tokenResponsed)
                    console.warn('token => ', tokenResponsed)
                }}
            />
        </View>
    );
}