import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Toast from 'react-native-toast-message';

export function getSettersToast(setters) {
    return setters
}

export default function ToastComponent() {
    const [type, setType] = useState('success')
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    getSettersToast({ setType, setText1, setText2 })
    const showToast = () => {
      Toast.show({
        type: type, // 'success' | 'error' | 'info'
        text1: text1,
        text2: text2,
        position: 'bottom', // 'top' | 'bottom'
        visibilityTime: 3000,
      });
    };

  return (
    <View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});