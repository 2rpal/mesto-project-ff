const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-38',
  authorization: '1f8e2a8a-f6e1-4325-8bc4-fc2c4878ac28',
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.authorization
    }
  })
  .then(handleResponse)
}

export function getStartingCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.authorization
    }
  })
  .then(handleResponse)
}

export function patchUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(handleResponse)
}

export function addNewCard (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(handleResponse)
}

export function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorization
    }
  });
}

export function likeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.authorization
    }
  })
  .then(handleResponse)
}

export function unlikeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorization
    }
  })
  .then(handleResponse)
}

export function patchUserAvatar (avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(handleResponse)
}