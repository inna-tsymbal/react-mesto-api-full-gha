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
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._url}cards/`, {
      headers: this._headers,
    });
  }

  patchUserInfo(data) {
    return this._request(`${this._url}users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  postNewCard(data) {
    return this._request(`${this._url}cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  putLikeCard(id) {
    return this._request(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLikeCard(id) {
    return this._request(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  patchUserAvatar(data) {
    return this._request(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }
}

export const api = new Api({
  url: "https://api.mesto.innatsymbal.nomoredomainsrocks.ru",
  headers: {"Content-Type": "application/json"},
});
