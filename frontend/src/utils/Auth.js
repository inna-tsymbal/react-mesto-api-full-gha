//export const BASE_URL = 'https://auth.nomoreparties.co';
//export const BASE_URL = 'http://localhost:3000';

export const url = "https://api.mesto.innatsymbal.nomoredomainsrocks.ru";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  }).then(checkResponse)
};

export const login = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  }).then(checkResponse)
};

export const logout = () => {
  return fetch(`${url}/signout`, {
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    }).then(checkResponse)
}

export const checkToken = () => {
  return fetch(`${url}/users/me`, {
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse)
};