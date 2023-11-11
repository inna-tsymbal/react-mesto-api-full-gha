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
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
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
    .then(this._checkResponse);
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
    .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(avatar),
    })
    .then(this._checkResponse);
  }
}

export const api = new Api({
  //url: "https://mesto.nomoreparties.co/v1/cohort-69",
  //headers: {
      //authorization: "e7ba1a9e-f2b7-42f1-b3b7-db01471a0a76",
      //"Content-Type": "application/json",
  //}
  //url: "http://localhost:3000",
  url: "https://api.mesto.innatsymbal.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
});