class Api {
  constructor({ url }) {
    this._url = url;
    // this._credentials = credentials;
  }
  
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo(token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // credentials: this._credentials,
    });
  }

  getInitialCards(token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // credentials: this._credentials,
    });
  }

  patchUserInfo(data, token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
  }

  postNewCard(data, token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId, token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: this._credentials,
    });
  }

  putLikeCard(cardId, token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: this._credentials,
    });
  }

  deleteLikeCard(cardId, token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: this._credentials,
    });
  }

  patchUserAvatar(avatar, token) {
    // const token = localStorage.getItem("jwt");
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: this._credentials,
      body: JSON.stringify(avatar),
    });
  }
}

export const api = new Api({
  url: "https://api.mesto.innatsymbal.nomoredomainsrocks.ru",
  // credentials: 'include',
});
