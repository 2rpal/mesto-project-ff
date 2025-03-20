// Импортируем массив initialCards
import { initialCards } from "./cards.js";
// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
let cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard({ name, link }, deleteCard) {
  let card = cardTemplate.cloneNode(true).querySelector('.card');
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardList.append(card);
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(({ name, link }) => {
  createCard({ name, link }, deleteCard);
});