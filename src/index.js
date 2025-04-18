import "./index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likedCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// DOM элементы
const cardsContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup_type_image");

const popupElements = document.querySelectorAll(".popup");
const editProfileFormElement = document.querySelector(".popup__form");
const nameInput = editProfileFormElement.querySelector(
  ".popup__input_type_name"
);
const jobInput = editProfileFormElement.querySelector(
  ".popup__input_type_description"
);

const addCardFormElement = document.querySelector('form[name="new-place"]');
const placeCardNameInput = addCardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const placeCardLinkInput = addCardFormElement.querySelector(
  ".popup__input_type_url"
);

// Функция открытия попапа с изображением
function handleImageClick({ name, link }) {
  const popupImg = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");

  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;

  openModal(popup);
}

// Вывести стартовые карточки
initialCards.forEach(({ name, link }) => {
  const card = createCard(
    { name, link },
    deleteCard,
    likedCard,
    handleImageClick
  );
  cardsContainer.append(card);
});

// Добавить анимации всем попапам
popupElements.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Обработчик формы редактирования профиля
function editProfileHandleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal();
}

// Обработчик добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const name = placeCardNameInput.value;
  const link = placeCardLinkInput.value;

  const card = createCard(
    { name, link },
    deleteCard,
    likedCard,
    handleImageClick
  );
  cardsContainer.prepend(card);

  addCardFormElement.reset();
  closeModal();
}

// Открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  const popup = document.querySelector(".popup_type_edit");
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(popup);
});

// Отправка формы редактирования профиля
editProfileFormElement.addEventListener("submit", editProfileHandleFormSubmit);

// Открытие попапа добавления карточки
addProfileButton.addEventListener("click", () => {
  const popup = document.querySelector(".popup_type_new-card");
  openModal(popup);
});

// Отправка формы новой карточки
addCardFormElement.addEventListener("submit", addNewCard);
