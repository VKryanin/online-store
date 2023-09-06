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
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('img', data.img);
        formData.append('brandId', data.brandId);
        formData.append('typeId', data.typeId);
        formData.append('info', JSON.stringify(data.info));
        return fetch(`${this._link}/device`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: formData
        }).then((res) => this._checkResponse(res))
    }

    addRating(data, token) {
        console.log(data, token, 'addRating');
        return fetch(`${this._link}/rating`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    getDevice(id) {
        return fetch(`${this._link}/device/${id}`, {
        })
            .then((res) => this._checkResponse(res))
            .catch((error) => {
                console.error(error);
            });
    }

    getDevices(brandId, typeId, limit, page) {
        const params = {
            ...brandId,
            ...typeId,
            ...limit,
            ...page
        };
        const queryString = Object.entries(params)
            .filter(([key, value]) => value && key !== undefined) // Фильтруем только определенные значения
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        const url = `${this._link}/device?${queryString}`;
        return fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res));
    }
}

export const deviceApi = new DeviceApi();