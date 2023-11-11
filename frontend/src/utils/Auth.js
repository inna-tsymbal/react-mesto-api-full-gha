export const url = "https://api.mesto.innatsymbal.nomoredomainsrocks.ru";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
  }).then(checkResponse)
};

export const login = (password, email) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email
    }),
  }).then(checkResponse)
};

export const checkToken = () => {
  return fetch(`${url}/users/me`, {credentials: 'include'}).then(checkResponse)
};
