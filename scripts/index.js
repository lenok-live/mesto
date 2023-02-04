const popupBtnOpen = document.querySelector('.profile__open-popup');
const popupContainer = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__close-button');
const jobInput = document.querySelector('.popup__input_type_profession');
const nameInput = document.querySelector('.popup__input_type_name');
const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');

function openPopup () {
  popupContainer.classList.add('popup_opened');
  nameInput.value = profTitle.textContent;
  jobInput.value = profSubtitle.textContent;
}

function closePopup () {
  popupContainer.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profTitle.textContent = nameInput.value;
  profSubtitle.textContent = jobInput.value;
  closePopup();
}

popupBtnOpen.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
