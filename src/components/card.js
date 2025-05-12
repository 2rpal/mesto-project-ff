import { deleteCardById, likeCard, unlikeCard } from '../scripts/api.js';

// Функция удаления карточки
function deleteCard(evt, cardId, cardElement) {
  deleteCardById(cardId)
    .then(res => {
      if (res.ok) {
        cardElement.remove();
      } else {
        return Promise.reject('Ошибка при удалении карточки');
      }
    })
    .catch(err => console.error(err));
}

// Функция лайка на карточку
function likedCard(evt, cardId, likesCounter) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active')
  const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  request
  .then(res => {
    likeButton.classList.toggle('card__like-button_is-active')
    likesCounter.textContent = res.likes.length
  })
}

// Функция создания карточки
function createCard(
  { name, link, likes, ownerId, cardId },
  userId,
  handleDelete,
  handleLike,
  handleImageClick
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true).querySelector(".card");

  const imageElement = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likesCounter = card.querySelector(".likes-count");

  imageElement.src = link;
  imageElement.alt = name;
  card.querySelector(".card__title").textContent = name;
  likesCounter.textContent = likes.length;

  if (likes.some(user => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (ownerId !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (evt) =>
      handleDelete(evt, cardId, card)
    );
  }

  imageElement.addEventListener("click", () =>
    handleImageClick({ name, link })
  );

  likeButton.addEventListener("click", (evt) =>
    handleLike(evt, cardId, likesCounter)
  );

  return card;
}

export { createCard, deleteCard, likedCard };
