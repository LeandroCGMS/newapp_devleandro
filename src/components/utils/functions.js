import { SERVER, PATH_JWT, PATH_USER_DATA, PATH_USER_CREATE_UPDATE } from '@/components/utils/constants'
import { useGlobalContext } from '@/contexts/GlobalContext';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

export async function obterClimaPorLocalizacao() {
    try {
        // 1. Solicita permissão para acessar a localização do dispositivo
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permissão de localização negada');
        }

        // 2. Obtém as coordenadas atuais (Latitude e Longitude)
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = location.coords;

        // 3. Faz a requisição para a Open-Meteo enviando as coordenadas
        // Pedimos a temperatura atual (current_weather=true) e fuso horário automático
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

        const response = await fetch(url);
        const data = await response.json();

        const currentWeather = data.current_weather;

        // Retorna um objeto formatado com os dados principais
        return {
            temperatura: Math.round(currentWeather.temperature), // Ex: 28
            codigoClima: currentWeather.weathercode,             // Código para definir o ícone (sol, chuva, etc)
            velocidadeVento: currentWeather.windspeed,
        };

    } catch (error) {
        return { error: error };
    }
}

export function obterIconeClima(weathercode) {
    // Códigos WMO da Open-Meteo:
    // 0: Céu limpo / Sol
    // 1, 2, 3: Parcialmente nublado
    // 45, 48: Nevoeiro
    // 51 a 67, 80 a 82: Chuva / Garoa
    // 95, 96, 99: Tempestade

    if (weathercode === 0) {
        return { name: 'sunny-outline', color: '#FFD700', text: 'Ensolarado' };
    } else if (weathercode >= 1 && weathercode <= 3) {
        return { name: 'cloudy-night-outline', color: '#A0AAB2', text: 'Nublado' };
    } else if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) {
        return { name: 'rainy-outline', color: '#36aac7', text: 'Chuvoso' };
    } else if (weathercode >= 95) {
        return { name: 'thunderstorm-outline', color: '#E74C3C', text: 'Tempestade' };
    }

    return { name: 'cloud-outline', color: '#36aac7', text: 'Tempo bom' };
}

export async function obterAnoComRedundancia(setCurrentYearOnline = new Function(),
    setError = new Function(), setSuccess = new Function()) {
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
                break
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

var count = 0
export async function pegarCotacaoDolar(setDolar = new Function()) {
    count++
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            }
        });
        console.warn('>>>> ', response)
        const data = await response.json();

        // A resposta vem dentro da chave 'USDBRL'
        setDolar(data)
        // return { dolar_compra: parseFloat(dolar.bid), dolar_venda: parseFloat(dolar.ask), variacao: parseFloat(dolar.pctChange), ultima_atualizacao: dolar.create_date }
    } catch (error) {
        return { error: error }
    }
}

var URL_CREATE_UPDATE = SERVER + PATH_USER_CREATE_UPDATE
async function createUser(formDataOrJSON, setLoading, tokengoogle) {
    var response, json
    try {
        response = await fetch(URL_CREATE_UPDATE, {
            method: 'POST', // Ou 'POST', 'PUT', etc.
            headers: {
                'tokengoogle': tokengoogle,
                'Accept': 'application/json',
            },
            body: formDataOrJSON
        })
        json = await response.json()
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}\nResposta em JSON: ${JSON.stringify(json)}`);
        }
        return { response: json }
    } catch (error) {
        return { error: error }
    }

}

function getNow() {
    return String('\n\nData e horário atual: ' + new Date().toLocaleString())
}

async function updateUser(formData, setLoading, tokengoogle, dataJWT) {
    var response, json
    try {
        // __DEV__ ? URL = 'http://10.0.2.3:9001/api-angular/accounts-rest-json/' : URL = 'https://devleandrocgms.online/api-angular/accounts-rest-json/'
        response = await fetch(URL_CREATE_UPDATE, {
            method: 'PATCH', // Ou 'POST', 'PUT', etc.
            headers: {
                'Accept': 'application/json',
                'tokengoogle': tokengoogle,
                'Authorization': `Bearer ${dataJWT.access}`,
            },
            body: formData
        })
        json = await response.json()
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}\nResposta em JSON: ${JSON.stringify(json)}`);
        }
        return { response: json }
    } catch (error) {
        return { error: error }
    }
}

export function createObservable(initialValue) {
    let value = initialValue;
    const listeners = [];

    return {
        get value() {
            return value;
        },

        set value(newValue) {
            value = newValue;

            listeners.forEach(callback => {
                callback(newValue);
            });
        },

        subscribe(callback) {
            listeners.push(callback);

            return () => {
                const index = listeners.indexOf(callback);

                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        }
    };
}