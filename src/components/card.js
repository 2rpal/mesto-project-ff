// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Функция лайка на карточку
function likedCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// Функция создания карточки
function createCard(
  { name, link },
  handleDelete,
  handleLike,
  handleImageClick
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true).querySelector(".card");

  const imageElement = card.querySelector(".card__image");
  imageElement.src = link;
  imageElement.alt = name;
  card.querySelector(".card__title").textContent = name;

  imageElement.addEventListener("click", () =>
    handleImageClick({ name, link })
  );
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDelete);
  card
    .querySelector(".card__like-button")
    .addEventListener("click", handleLike);

  return card;
}

export { createCard, deleteCard, likedCard };
