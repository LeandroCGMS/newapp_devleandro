import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { sleep } from '@/components/utils/functions';

var webViewRef = null;
var functionReceived = null
var token = null
var tokenListener = null;
function setToken(newToken) {
    token = newToken;
    if (tokenListener) {
        tokenListener(token);
        tokenListener = null;
    }
}
export function handleGenerateRecaptcha() {
    if (token != null) token = null
    return new Promise(async (resolve, reject) => {
        tokenListener = (newToken) => {
            resolve(newToken);
        };
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript('executeRecaptcha(); true;');
        }
        await sleep(5000);
        if (token === null) {
            tokenListener = null;
            reject(false);
        }
    })
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
                onMessage={async (response) => {
                    setToken(response)
                }}
            />
        </View>
    );
}