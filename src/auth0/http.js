import { login } from "./auth0"

const checkAuth = () => {
    // Get access and refresh tokens
    let at = localStorage.getItem("access_token");
    let rt = localStorage.getItem("refresh_token");
    if (at == null || rt == null) {
        // Login
        login();
        return false;
    }
    return at;
}

export const post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: data,
    })
        .then(res => res.json())
        .catch(err => err);
};

export const get = url => {
    let at = checkAuth();
    if (at !== false) {
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${at}`
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err));
    }
};