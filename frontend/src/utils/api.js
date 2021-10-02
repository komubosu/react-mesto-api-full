class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }

  uploadNewCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCard)
    }).then(res => this._checkAnswer(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }

  setNewAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newAvatar)
    }).then(res => this._checkAnswer(res))
  }

  setNewUserInfo(newUserInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUserInfo)
    }).then(res => this._checkAnswer(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ?
    fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkAnswer(res))
    :
    fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._checkAnswer(res))
  }
}

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-25`,
  headers: {
    authorization: `b8ea5ec6-acae-49b3-8816-991c5350bb3b`,
    'Content-Type': 'application/json'
  }
});

export default api;