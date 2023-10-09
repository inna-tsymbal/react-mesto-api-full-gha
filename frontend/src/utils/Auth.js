class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _testData(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(res => Promise.reject(res.message || res.error));
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._testData(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._testData(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._testData(res));
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers,
      }
    })
      .then(res => this._testData(res))
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://api.mesto.innatsymbal.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
