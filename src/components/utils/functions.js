import { SERVER, PATH_JWT, PATH_USER_DATA } from '@/components/utils/constants'
import { useGlobalContext } from '@/contexts/GlobalContext';


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
        console.warn(`tokenGoogle => ${googleToken}\n\n=====================================================\n\n\n`)
        console.warn(`Depois de conseguir validar usuário e conseguir o JWT, não foi possível obter seus dados da rota específica\n${error}`)
        // showModal(`Depois de conseguir validar usuário, não foi possível obter seus dados. Tente novamente ou contacte o suporte.`)
        // logError(`Depois de conseguir validar usuário e conseguir o JWT, não foi possível obter seus dados da rota específica\n${error}`);
        // console.warn(await getLogs())
        // setLoading(false)
        return {error: error}
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
        console.warn(`Depois de conseguir validar usuário e conseguir o JWT, não foi possível obter seus dados da rota específica\n${error}`)
        // showModal(`Depois de conseguir validar usuário, não foi possível obter seus dados. Tente novamente ou contacte o suporte.`)
        // logError(`Depois de conseguir validar usuário e conseguir o JWT, não foi possível obter seus dados da rota específica\n${error}`);
        // console.warn(await getLogs())
        // setLoading(false)
        return {error: error}
    }
}