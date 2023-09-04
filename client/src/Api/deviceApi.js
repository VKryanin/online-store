class DeviceApi {
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

    addBrand(name, token) {
        return fetch(`${this._link}/brand`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({ name })
        }).then((res) => this._checkResponse(res))
    }

    getBrand() {
        return fetch(`${this._link}/brand`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res))
    }

    addType(name, token) {
        return fetch(`${this._link}/type`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({ name })
        }).then((res) => this._checkResponse(res))
    }

    getType() {
        return fetch(`${this._link}/type`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res))
    }

    addDevice(data, token) {
        return fetch(`${this._link}/device`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: data
        }).then((res) => this._checkResponse(res))
    }

    getDevice(id) {
        return fetch(`${this._link}/device/${id}`, {
        })
    }

    getDevices() {
        return fetch(`${this._link}/device`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res))
    }
}

export const deviceApi = new DeviceApi();