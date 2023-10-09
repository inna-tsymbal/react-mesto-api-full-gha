class Api {
  constructor(option) {
    this._url = option.url;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject
}

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
      .then(this._checkResponse)
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      body: JSON.stringify({
          name: data.username,
          about: data.description,
      })
  })
      .then(this._checkResponse)
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      body: JSON.stringify({
          name: data.placename,
          link: data.placelink,
      })
  })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
      .then(this._checkResponse)
  }

  putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
      .then(this._checkResponse)
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
      .then(this._checkResponse)
  }

  patchUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      body: JSON.stringify({
          avatar: data.userphoto,
      })
  })
      .then(this._checkResponse)
    }
  }

export const api = new Api({
  url: "http://api.mesto.innatsymbal.nomoredomainsrocks.ru",
});
