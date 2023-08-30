import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/constants";

class UserApi {
    constructor() {
        this._link = 'http://localhost:7000/api/user'
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
        return fetch(`${this._link}/registration`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password, name })
        }).then((res) => this._checkResponse(res))
    }

    singin({ email, password }) {
        return fetch(`${this._link}/login`, {
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
        return fetch(`${this._link}/userinfo`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                Accept: '/',
            }
        }).then((res) => this._checkResponse(res));
    }
}

export const userApi = new UserApi();