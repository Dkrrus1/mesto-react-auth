class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authUrl = options.authUrl;
    this._headers = options.headers;
  }

  _errorCheck(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._errorCheck)
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._errorCheck)
  }

  setUserData(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._errorCheck)
  }

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
      .then(this._errorCheck)
  }

  addNewPicture(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._errorCheck)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
      })
        .then(this._errorCheck)
    } else {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      })
        .then(this._errorCheck)
    }

  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._errorCheck)
  }

  registerUser(email, password) {
    return fetch(`${this.authUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
  }

  loginUser(email, password) {
    return fetch(`${this.authUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  authUrl: 'https://auth.nomoreparties.co',
  headers: {
    authorization: '6aa2b4e4-0910-4691-8a6e-cf24dcaa9898',
    'Content-Type': 'application/json'
  }
});