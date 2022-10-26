const BASE_URL = "https://auth.nomoreparties.co";

function errorCheck(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const registerUser = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then(errorCheck);
};

export const loginUser = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then(errorCheck);
};

export const getToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        metod: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(errorCheck);
};