import { SERVER, PATH_JWT } from '@/components/utils/constants'
import { useGlobalContext } from '@/contexts/GlobalContext';

export function getJWT(username, password) {
    const { setJWT } = useGlobalContext();
    //setLoading(true)
    try {
        const response = await fetch(SERVER + PATH_JWT, { // https://devleandrocgms.online/api-angular/accounts-rest-json/
            method: 'POST', // Ou 'POST', 'PUT', etc.
            headers: {
                'Content-Type': 'application/json',
                'tokengoogle': receiveGoogleTokenRecaptcha // FAKE_KEY pode ser usado também
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        setJWT(await response.json())
        return true
    } catch (error) {
        console.error(`tokenGoogle => ${tokenGoogle}\n\nJWT => ${token}\n\n=====================================================\n\n\n`)
        console.error(`Depois de conseguir validar usuário e conseguir o JWT, não foi possível obter seus dados da rota específica\n${error}`)
        // showModal(`Depois de conseguir validar usuário, não foi possível obter seus dados. Tente novamente ou contacte o suporte.`)
        // logError(`Depois de conseguir validar usuário e conseguir o JWT, não foi possível obter seus dados da rota específica\n${error}`);
        // console.warn(await getLogs())
        // setLoading(false)
        setJWT(null)
        return false
    }
}