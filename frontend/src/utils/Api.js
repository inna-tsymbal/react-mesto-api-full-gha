class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._headers = headers;
    this._credentials = credentials;
  }
  
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  patchUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
  }

  postNewCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  putLikeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  deleteLikeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  patchUserAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(avatar),
    });
  }
}

export const api = new Api({
  url: "https://api.mesto.innatsymbal.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
});