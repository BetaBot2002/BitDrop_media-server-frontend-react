import { isExpired, decodeToken } from "react-jwt";
let accessToken = ''

const setAccessToken = (token) => {
    accessToken = token
}

const getAccessToken = async () => {
    if (accessToken !== '' && !isExpired(accessToken)) {
        console.log(`if`,decodeToken(accessToken))
        return accessToken;
    } else {
        console.log(`else`,decodeToken(accessToken))
        try {
            const response = await fetch(`http://127.0.0.1:3000/user/refresh`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${getRefreshToken()}`
                }
            });

            const data = await response.json();
            setAccessToken(data.accsessToken);
            return data.accsessToken;
        } catch (error) {
            // Handle errors here
            console.error(error);
            throw error;
        }
    }
};
const getNewAccessToken = async () => {

    try {
        const response = await fetch(`http://127.0.0.1:3000/user/refresh`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${getRefreshToken()}`
            }
        });

        const data = await response.json();
        setAccessToken(data.accsessToken);
        console.log(data.accsessToken)
        return data.accsessToken;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error;
    }

};

const getAnyAccessToken = () => {
    return accessToken
}

const setRefreshToken = (token) => {
    if (token == ``) {
        localStorage.removeItem('refresh')
    } else {

        localStorage.setItem('refresh', token)
    }
}
const getRefreshToken = () => {
    return localStorage.getItem('refresh')
}

export {
    setAccessToken,
    getAccessToken,
    setRefreshToken,
    getRefreshToken,
    getAnyAccessToken,
    getNewAccessToken
}