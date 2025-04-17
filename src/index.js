import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likedCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// DOM элементы
const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const placesListElement = document.querySelector('.places__list');
const popupElements = document.querySelectorAll('.popup');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const addCardFormElement = document.querySelector('form[name="new-place"]');
const placeCardNameInput = addCardFormElement.querySelector('.popup__input_type_card-name');
const placeCardLinkInput = addCardFormElement.querySelector('.popup__input_type_url');


// Вывести начальные карточки
initialCards.forEach(({ name, link }) => {
  const card = createCard({ name, link }, deleteCard, likedCard);
  cardsContainer.append(card);
});

// Добавить анимации всем попапам
popupElements.forEach(item => {
  item.classList.add('popup_is-animated');
});

// Функция отправки формы профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal();
}

// Функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const name = placeCardNameInput.value;
  const link = placeCardLinkInput.value;
  const card = createCard({ name, link }, deleteCard, likedCard);
  cardsContainer.prepend(card);
  addCardFormElement.reset();
  closeModal();
}

// Обработчики событий
editProfileButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_edit');
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(popup);
});

formElement.addEventListener('submit', handleFormSubmit);

addProfileButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_new-card');
  openModal(popup);
});

addCardFormElement.addEventListener('submit', addNewCard);

placesListElement.addEventListener('click', (evt) => {
  if (evt.target.matches('.card__image')) {
    const popup = document.querySelector('.popup_type_image');
    const popupImg = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');

    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;

    openModal(popup);
  }
});