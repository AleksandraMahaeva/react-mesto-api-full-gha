class Api {
    constructor(setting) {
        this._address = setting.baseUrl;
        this._headers = setting.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: this._headers
        }).then(this._getResponseData);
    }

    setUserInfo(userInfo) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userInfo)
        }).then(this._getResponseData);
    }

    getCreateCard() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: this._headers
        }).then(this._getResponseData);
    }

    setCreateCard(cardInfo) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(cardInfo)
        }).then(this._getResponseData);
    }

    toggleLike(isLiked, id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
        }).then(this._getResponseData);
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponseData);
    }

    updateAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(avatar)
        }).then(this._getResponseData);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: '68ed97fd-561d-4da1-ae76-aadea56716cb',
        'Content-Type': 'application/json'
    }
});

export default api;