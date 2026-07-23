<!-- # NewApp DevLeandro
## 🚀 Sobre o Projeto
   Criado em 12/07/2026.
   Este app já foi criado e "buildado" para os servidores da Expo, com o link abaixo:

[https://expo.dev/accounts/lecgms/projects/newapp_devleandro/builds/20020ec9-42db-48ad-9bf9-82321322fe30](https://expo.dev/accounts/lecgms/projects/newapp_devleandro/builds/20020ec9-42db-48ad-9bf9-82321322fe30)
---
---
<br>
<br>
<br>
<br>
<br>
<br>

# 23/07/2026 Informações sobre o Firebase, suas configurações e chamadas do restante do app
### 4. Como consumir no restante do seu app
#### Sempre que precisar usar o Firebase Auth nas suas telas ou layouts do Expo Router, basta importar o auth exportado desse arquivo:
```typescript
// Exemplo em qualquer tela (ex: app/index.tsx)
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/services/firebase';

const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", userCredential.user.uid);
  } catch (error) {
    console.error("Erro no login:", error);
  }
};
```
---
# 19/07/2026
### Comando para buildar o modo preview no EAS:
```bash
eas build --platform android --profile preview
```
### Linhas abaixo adicionadas para ocultar tela Splah:
```jsx
useEffect(() => {
		// Força a splash screen a sumir assim que o layout raiz for montado
		SplashScreen.hideAsync().catch(() => {
			/* ignora erros caso já tenha fechado */
		});
	}, []);
```
---
#  16/07/2026
### Removidas telas Index e Explore das Abas de Navegação Expo, com o código a seguir:
```jsx
<Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: null, // 👈 Isso esconde o botão da barra inferior completamente!
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          href: null, // 👈 Esconde o botão da barra inferior
        }}
      />
```
### Comando para compilar APK Release, sem precisar carregar do servidor Metro:
```bash
eas build --platform android --profile preview 
``` -->
<div align="center">

  # 📱 NewApp DevLeandro

  [![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)

  <p align="center">
    <b>Aplicativo mobile construído com Expo Router e Firebase Integration.</b>
  </p>

  <a href="https://expo.dev/accounts/lecgms/projects/newapp_devleandro/builds/20020ec9-42db-48ad-9bf9-82321322fe30">
    <img src="https://img.shields.io/badge/🚀_Acessar_Build_no_EAS-4630EB?style=for-the-badge&logoColor=white" alt="Link do Build no EAS" />
  </a>

</div>

<br />

---

## 🚀 Sobre o Projeto

Este app foi configurado e compilado (*buildado*) nos servidores do **EAS (Expo Application Services)**. Você pode acompanhar a última build diretamente através do link destacado no topo do documento.

<br />

---

## 📌 Histórico de Desenvolvimento

### 🗓️ 23/07/2026 — Informações sobre o Firebase & Consumo no App

> [!TIP]
> **Como consumir a autenticação no projeto:**
> Sempre que precisar utilizar o Firebase Auth em suas telas ou layouts no Expo Router, basta importar o `auth` exportado desse arquivo.

<details open>
<summary><b>🔍 Ver Exemplo de Código (Login com Firebase)</b></summary>

<br />

```typescript
// Exemplo em qualquer tela (ex: app/index.tsx)
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/services/firebase';

const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", userCredential.user.uid);
  } catch (error) {
    console.error("Erro no login:", error);
  }
};
