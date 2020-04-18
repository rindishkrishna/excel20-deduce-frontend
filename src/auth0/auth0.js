import config from './auth_config.json';
import auth0 from 'auth0-js';
import { postWithoutAuth } from './http';
import history from '../utils/history';
import { API_ROOT } from './api_config'

const webAuth = new auth0.WebAuth({
    clientID: config.clientID,
    domain: config.domain,
    responseType: 'token id_token',
    redirectUri: `${window.location.origin}/login/callback`,
    scope: 'openid profile email'
});

export const login = () => {
    webAuth.authorize();
}

export const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token_auth0');
    if (!accessToken) {
        console.log("No access token for auth0 found, redirecting to login");
        login()
    }
    return accessToken;
}

export const getProfile = (callback) => {
    let accessToken = getAccessToken();
    webAuth.client.userInfo(accessToken, (err, user) => {
        callback(err, user);
    });
}

export const handleAuthentication = () => {
    webAuth.parseHash({ hash: window.location.hash }, function (err, authResult) {
        if (err) {
            return console.log(err);
        }
        setSession(authResult, loc => {
            history.push(loc);
        });
    });
};

const setSession = async (authResult, redirect) => {
    // access_token_auth0 is auth0's token used to obtain user info from auth0.
    // access_token is the JWT issued by the backend used for making requests to the backend.
    localStorage.setItem("access_token_auth0", authResult.accessToken);
    let res = await postWithoutAuth(`${API_ROOT}login`, { "access_token": authResult.accessToken });
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    redirect('/');
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token_auth0');
    history.push('/');
};