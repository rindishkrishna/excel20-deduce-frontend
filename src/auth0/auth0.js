import config from './auth_config.json';
import auth0 from 'auth0-js';
//import * as http from './http';
import history from '../utils/history';

const webAuth = new auth0.WebAuth({
    clientID : config.clientID,
    domain : config.domain,
    responseType: 'token id_token',
    redirectUri: `${window.location.origin}/login/callback`,
    scope: 'openid profile email'
});

export const login = () => {
    webAuth.authorize();
}

export const isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}

export const getIdToken = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
        throw new Error('No ID Token found');
    }
    return idToken;
}
export const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No Access Token found');
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
    webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      if (err) {
        return console.log(err);
      }
      setSession(authResult, loc => {
        history.push(loc);
      });
    });
  };
  
const setSession = async (authResult, redirect) => {
    const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    console.log(authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    /*const body = new FormData();
    body.append('access_token', authResult.accessToken);
    const res = await http.post(`${window.location.origin}/auth/v1/signin`, body);
    if (res.Error) {
        alert('Login failed');
        redirect('/login');
    }*/
    redirect('/');
};

export const logout = () => {
    /*fetch(`${window.location.origin}/auth/v1/signout`, {
        mode: 'cors',
    })
        .then(res => {
        return res.json();
        })
        .then(data => {
        if (data.Success) {*/
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    history.push('/');
    /* } else {
            window.alert('Logout failed, check your network and try again');
        }
        });*/
};