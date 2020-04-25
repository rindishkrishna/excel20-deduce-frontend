import { login } from "./auth0"

export const checkAuth = () => {
    // Get access and refresh tokens
    let at = localStorage.getItem("access_token");
    let rt = localStorage.getItem("refresh_token");
    let at_auth0 = localStorage.getItem("access_token_auth0")
    console.log("Values in checkauth")
    console.log(at, rt, at_auth0)
    if (at === "undefined" || rt === "undefined" || at_auth0 === "undefined" || !at || !rt || !at_auth0) {
        console.log("redirecting to login...")
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

export const post = (url, data) => {
    let at = checkAuth();
    if (at) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${at}`
            }
        }).then(res => res.json())
            .catch(err => err)
    }
}

export const get = url => {
    let at = checkAuth();
    if (at) {
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