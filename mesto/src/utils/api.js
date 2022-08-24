import {
  handlersApi,
  token,
  urlApiBase,
} from './constants.js';

class Api {
  constructor(baseUrl, handlers, headers) {
    this._baseUrl = baseUrl;
    this._handlers = handlers;
    this._headers = headers;
  }

  setLike(cardId, like) {
    return fetch(`${this._baseUrl}/${this._handlers.likes}/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._getJson);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/${this._handlers.cards}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._getJson);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/${this._handlers.me}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._getJson);
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/${this._handlers.me}`, {
      headers: this._headers,
    })
      .then(this._getJson);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${this._handlers.cards}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getJson);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/${this._handlers.avatar}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._getJson);
  }

  loadCards() {
    return fetch(`${this._baseUrl}/${this._handlers.cards}`, {
      headers: this._headers,
    })
      .then(this._getJson);
  }

  _getJson(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }
}

const api = new Api(
  urlApiBase,
  handlersApi,
  {
    authorization: token,
    'Content-Type': 'application/json'
  }
);

export default api;
