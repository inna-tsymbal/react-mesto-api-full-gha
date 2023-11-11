class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._headers = headers;
    this._credentials = credentials;
  }
  
  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка получения ответа от сервера: ${res.status}`)
  }

  // _request(url, options) {
  //   return fetch(url, options).then(this._checkResponse);
  // }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse.bind(this));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse.bind(this));
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._checkResponse.bind(this));
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(this._checkResponse.bind(this));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse.bind(this));
  }

  putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse.bind(this));
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse.bind(this));
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(avatar),
    })
    .then(this._checkResponse.bind(this));
  }
}

export const api = new Api({
  url: "https://api.mesto.innatsymbal.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
});