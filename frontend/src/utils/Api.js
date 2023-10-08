/* eslint-disable no-undef */
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._url}users/me/`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._url}cards/`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  patchUserInfo(data) {
    return this._request(`${this._url}users/me/`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
    }),
    });
  }

  postNewCard(data) {
    return this._request(`${this._url}cards/`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
    }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    });
  }

  putLikeCard(id) {
  
    return this._request(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    });
  }

  deleteLikeCard(id) {
    return this._request(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    });
  }

  patchUserAvatar(data) {
    return this._request(`${this._url}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
    }),
    });
  }
}

export const api = new Api({
  url: "https://api.mesto.innatsymbal.nomoredomainsrocks.ru/",
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
