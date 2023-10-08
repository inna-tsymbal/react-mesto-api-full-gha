const url = "https://api.mesto.innatsymbal.nomoredomainsrocks.ru";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
  }),
  }).then(checkResponse)
};

export const login = (password, email) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
  }),
  }).then(checkResponse)
};

export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  }).then(checkResponse)
};
