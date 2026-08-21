import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TempInfoBanner({ top = 200, left = 20, right = 20, icon='logo-usd', info = '', color='#36aac7' }) {
	const styles = StyleSheet.create({
		bannerContainer: {
			position: 'absolute', // Não ocupa espaço no fluxo do layout
			top: top,
			left: left,
			right: right,
			zIndex: 999, // Fica sobreposto a tudo
			backgroundColor: '#1E1E1E',
			borderRadius: 25,
			paddingVertical: 10,
			paddingHorizontal: 20,
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: '#333',
			// Sombra para dar efeito flutuante
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
		},
		item: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		text: {
			color: '#FFF',
			fontSize: 13,
			fontWeight: '600',
			marginLeft: 6,
		},
		divider: {
			width: 1,
			height: 14,
			backgroundColor: '#444',
		},
	});
	const fadeAnim = useRef(new Animated.Value(0)).current; // Opacidade inicial 0

	useEffect(() => {
		// 1. Aparece suavemente (Fade In)
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();

		// 2. Aguarda 4 segundos e desaparece (Fade Out)
		const timer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Animated.View style={[styles.bannerContainer, { opacity: fadeAnim }]}>
			<View style={styles.item}>
				<Ionicons name={icon} size={16} color="#36aac7" />
				<Text style={styles.text}>{info}</Text>
			</View>
			{/* <View style={styles.divider} />
			<View style={styles.item}>
				<Ionicons name="cloud-outline" size={16} color="#36aac7" />
				<Text style={styles.text}>{temp} Sol</Text>
			</View> */}
		</Animated.View>
	);
}

