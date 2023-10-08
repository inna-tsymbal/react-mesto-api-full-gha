class Api {
  constructor({ url }) {
    this._url = url;

  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _getTokenLocalStorage() {
    return localStorage.getItem('jwt')
  }

  getUserInfo() {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}users/me/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getInitialCards() {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}cards/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  patchUserInfo(data) {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}users/me/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
  }

  postNewCard(data) {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}cards/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  }

  putLikeCard(id) {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  }

  deleteLikeCard(id) {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  }

  patchUserAvatar(data) {
    const token = this._getTokenLocalStorage();
    return this._request(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
  }
}

export const api = new Api({
  url: "http://api.mesto.innatsymbal.nomoredomainsrocks.ru",
});
