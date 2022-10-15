//FIRST GET TOKEN
const getToken = async (url, username, password) => {
    let token = await fetch(url)
        .then(res => res.json())
        .then(async (result) => {
            getSession(username, password, result.request_token)
            return result.request_token
        },
            (error) => {
                return error
            });
    return token;
};
//THEN VERIFY TOKEN WITH USERNAME AND PASSWORD
const getSession = async (username, password, token) => {
    let user_info = {
        "username": username,
        "password": password,
        "request_token": token
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_info)
    }
    let session = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1', requestOptions)
        .then(res => res.json())
        .then(async (result) => {
            if (result.success) {
                validateToken(result.request_token)
            }
            return result
        },
            (error) => {
                return error
            });
    return session;
}
//VALIDATE TOKEN
const validateToken = async (validated_token) => {
    let user_info = {
        "request_token": validated_token
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_info)
    }
    let userQuery = `https://api.themoviedb.org/3/authentication/session/new?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1`
    let validateToken = await fetch(userQuery, requestOptions)
        .then(res => res.json())
        .then(async (result) => {
            if (result.success) {
                localStorage.setItem('session-id', result.session_id)
                getUser(result.session_id)
            }
            return result
        },
            (error) => {
                return error
            });
    return validateToken;
}
//SET USER LOGGED IN LOCAL STORAGE
export const getUser = async (session) => {
    let userQuery = `https://api.themoviedb.org/3/account?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}`
    let userGet = await fetch(userQuery)
        .then((res) => {
            if (!res.ok) {
                throw Error('Something went wrong');
            } else {
                return res.json();
            }
        })
        .then(async (result) => {
            localStorage.setItem('user-id', result.id)
            window.location.href = '/';
            return result
        },
            (error) => {
                return error
            });
    return userGet;
};

export default getToken;