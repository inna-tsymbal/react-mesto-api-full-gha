class Api {
  constructor(option) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _testData(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
          ...this._headers
      }
  })
      .then(res => this._testData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
          ...this._headers
      }
  })
      .then(res => this._testData(res));
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
          ...this._headers
      },
      body: JSON.stringify({
          name: name,
          about: about
      })
  })
      .then(res => this._testData(res));
  }

  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
          ...this._headers
      },
      body: JSON.stringify({
          name: name,
          link: link
      })
  })
      .then(res => this._testData(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
          ...this._headers
      }
  })
      .then(res => this._testData(res));
  }

  putLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
          ...this._headers
      }
  })
      .then(res => this._testData(res));
  }

  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
          ...this._headers
      }
  })
      .then(res => this._testData(res));
  }

  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
          ...this._headers
      },
      body: JSON.stringify({
          avatar: link
      })
  })
      .then(res => this._testData(res));
}
  }

export const api = new Api({
  baseUrl: "http://api.mesto.innatsymbal.nomoredomainsrocks.ru",
  headers: {
    'Content-Type': 'application/json'
  }
});
