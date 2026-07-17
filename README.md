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
```

# NewApp DevLeandro
   Criado em 12/07/2026.
   Este app já foi criado e "buildado" para os servidores da Expo, com o link abaixo:

[https://expo.dev/accounts/lecgms/projects/newapp_devleandro/builds/20020ec9-42db-48ad-9bf9-82321322fe30](https://expo.dev/accounts/lecgms/projects/newapp_devleandro/builds/20020ec9-42db-48ad-9bf9-82321322fe30)