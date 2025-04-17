let openedPopup = null;

function openModal(popupElement) {
  openedPopup = popupElement;
  openedPopup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closeModalOnEsc);
  openedPopup.addEventListener('click', closeModalOnOverlayOrClose);
}

function closeModal() {
  if (openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closeModalOnEsc);
    openedPopup.removeEventListener('click', closeModalOnOverlayOrClose);
    openedPopup = null;
  }
}

function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function closeModalOnOverlayOrClose(evt) {
  if (
    evt.target.classList.contains('popup__close') ||
    !evt.target.closest('.popup__content') ||
    evt.target.classList.contains('popup__button')
  ) {
    closeModal();
  }
}

export { openModal, closeModal };