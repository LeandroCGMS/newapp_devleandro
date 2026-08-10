import { SERVER, PATH_JWT, PATH_USER_DATA } from '@/components/utils/constants'
import { useGlobalContext } from '@/contexts/GlobalContext';
import Toast from 'react-native-toast-message';

export async function obterAnoComRedundancia(setCurrentYearOnline = new Function()) {
  const apis = [
    'http://worldtimeapi.org/api/timezone/Etc/UTC',
    'https://timeapi.io/api/time/current/zone?timeZone=UTC',
  ];

  for (const url of apis) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos de timeout

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // A TimeAPI traz o ano direto no campo 'year', já a WorldTimeAPI traz no 'datetime'
        const ano = data.year || new Date(data.datetime).getFullYear();
        setCurrentYearOnline(ano);
        return ano;
      }
    } catch (e) {
      // Se falhar esta API, passa para a próxima da lista
      continue;
    }
  }

  // Se todas as APIs de rede falharem, usa a data do dispositivo como última opção
  return new Date().getFullYear();
}

export const dispararToastSucesso = (text1, text2, visibilityTime = 3000) => {
    Toast.show({
        type: 'success',
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: visibilityTime,
        position: 'top', // 👈 Posição superior
        topOffset: 50,  // 👈 Distância em pixels em relação ao topo da tela (útil para desviar da StatusBar / Notched area)
    });
};

export const dispararToastErro = (text1, text2, visibilityTime = 3000) => {
    Toast.show({
        type: 'error',
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: visibilityTime,
        position: 'top', // 👈 Posição superior
        topOffset: 50,  // 👈 Distância em pixels em relação ao topo da tela (útil para desviar da StatusBar / Notched area)
    });
};


export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getJWT(username, password, googleToken) {
    try {
        const response = await fetch(SERVER + PATH_JWT, { // https://devleandrocgms.online/api-angular/accounts-rest-json/
            method: 'POST', // Ou 'POST', 'PUT', etc.
            headers: {
                'Content-Type': 'application/json',
                'tokengoogle': googleToken // FAKE_KEY pode ser usado também
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return await response.json()
    } catch (error) {
        return { error: error }
    }
}

export async function getUserData(keyAccess, googleToken) {
    try {
        const response = await fetch(SERVER + PATH_USER_DATA, { // https://devleandrocgms.online/api-angular/accounts-rest-json/
            method: 'GET', // Ou 'POST', 'PUT', etc.
            headers: {
                'Content-Type': 'application/json',
                'tokengoogle': googleToken,
                'Authorization': `Bearer ${keyAccess}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return await response.json()
    } catch (error) {
        return { error: error }
    }
}