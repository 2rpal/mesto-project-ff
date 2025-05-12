import "./index.css";
import { createCard, deleteCard, likedCard } from "./components/card.js";
import { openModal, closeModal, saving } from "./components/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { getUserInfo, getStartingCards, patchUserInfo, addNewCard, patchUserAvatar} from "./scripts/api.js";

// Настройки для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включаем валидацию
enableValidation(validationConfig);

// DOM элементы
const userInfo = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description'),
  avatar: document.querySelector('.profile__image'),
  id: null
}

const cardsContainer = document.querySelector(".places__list");
const editAvatarButton = document.querySelector('.profile__image')
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");

const popupElements = document.querySelectorAll(".popup");

const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarFormElement = editAvatarPopup.querySelector(".popup__form");
const avatarInput = editAvatarFormElement.querySelector(".popup__input_type_avatar");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileFormElement = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const jobInput = editProfileFormElement.querySelector(".popup__input_type_description");

const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardFormElement = newCardPopup.querySelector(".popup__form");
const placeCardNameInput = addCardFormElement.querySelector(".popup__input_type_card-name");
const placeCardLinkInput = addCardFormElement.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector(".popup_type_image");

//получения данных о пользователе\
getUserInfo()
.then(res => {
    userInfo.name.textContent = res.name;
    userInfo.description.textContent = res.about;
    userInfo.avatar.style.backgroundImage = `url(${res.avatar})`
    userInfo.id = res._id
})
.catch(err => {
  console.log(err)
})

// Рендер стартовых карточек

getStartingCards()
.then(res => {
  res.forEach((item) => {
  const card = createCard(
    {
      name: item.name,
      link: item.link,
      likes: item.likes,
      ownerId: item.owner._id,
      cardId: item._id
    },
    userInfo.id,
    deleteCard,
    likedCard,
    handleImageClick
    );
  cardsContainer.append(card);
  });
})
.catch(err => {
  console.log(err)
})


// Открытие попапа с изображением
function handleImageClick({ name, link }) {
  const popupImg = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// Отправка формы редактирования профиля
function editProfileHandleFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = document.querySelector('.popup_type_edit .popup__button')
  saving(true, submitButton)
  patchUserInfo(nameInput.value, jobInput.value)
  .then((data) => {
    userInfo.name.textContent = data.name;
    userInfo.description.textContent = data.about;
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    saving(false, submitButton)
  })
}

//Открытие формы аватара 
editAvatarButton.addEventListener('click', () => {
  clearValidation(editAvatarFormElement, validationConfig)
  openModal(editAvatarPopup)
})

//отправка формы аватара
editAvatarFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  const submitButton = document.querySelector('.popup_type_edit-avatar .popup__button')
  saving(true, submitButton)
  patchUserAvatar(avatarUrl)
    .then((res) => {
      userInfo.avatar.style.backgroundImage = `url(${res.avatar})`;
      editAvatarFormElement.reset();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      saving(false, submitButton)
    })
});

// Открытие формы профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  clearValidation(editProfileFormElement, validationConfig);
  openModal(editProfilePopup);
});

// Обработка отправки формы профиля
editProfileFormElement.addEventListener("submit", editProfileHandleFormSubmit);

// Открытие формы новой карточки
addProfileButton.addEventListener("click", () => {
  addCardFormElement.reset();
  clearValidation(addCardFormElement, validationConfig);
  openModal(newCardPopup);
});

// Отправка формы добавления карточки
addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = placeCardNameInput.value;
  const link = placeCardLinkInput.value;
  const submitButton = document.querySelector('.popup_type_new-card .popup__button')
  saving(true, submitButton)
  addNewCard(name, link)
  .then(data => {
    const card = createCard(
      {
        name: data.name, 
        link: data.link, 
        likes: data.likes,
        ownerId: data.owner._id,
        cardId: data._id  
      },
      userInfo.id,
      deleteCard,
      likedCard,
      handleImageClick
    );
    cardsContainer.prepend(card);
    addCardFormElement.reset();
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    saving(false, submitButton)
  })
});

// Анимация попапов (опционально)
popupElements.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});