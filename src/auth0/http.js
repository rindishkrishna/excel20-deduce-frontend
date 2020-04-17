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

export const postWithoutAuth = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
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

export const getWithoutAuth = url => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err));
}