import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/constants";

class UserApi {
    constructor() {
        this._link = 'http://localhost:7000/api'
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return res.text().then((text) => {
            throw JSON.parse(text).message || JSON.parse(text).error;
        })
    }

    singup({ email, password, name }) {
        return fetch(`${this._link}/user/registration`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password, name })
        }).then((res) => this._checkResponse(res))
    }

    singin({ email, password }) {
        console.log();
        return fetch(`${this._link}/user/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email, password,
            })
        }).then((res) => this._checkResponse(res));
    }

    getUserInfo(token) {
        return fetch(`${this._link}/user/userinfo`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                Accept: '/',
            }
        }).then((res) => this._checkResponse(res));
    }

    userUpdate({ email, password, name }, token) {
        const requestBody = {};
        if (email) {
            requestBody.email = email;
        }
        if (password) {
            requestBody.password = password;
        }
        if (name) {
            requestBody.name = name;
        }
        console.log(requestBody, token, 1);
        return fetch(`${this._link}/user/update`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify(requestBody)
        }).then((res) => this._checkResponse(res));
    }

    addAvatar(data, token) {
        const formData = new FormData();
        formData.append('userId', data.userId);
        formData.append('img', data.img);
        return fetch(`${this._link}/avatar`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: formData
        }).then((res) => this._checkResponse(res))
    }

    getAvatar(token) {
        return fetch(`${this._link}/avatar`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => this._checkResponse(res))
            .catch((error) => {
                console.error(error);
            })
    }
}

export const userApi = new UserApi();