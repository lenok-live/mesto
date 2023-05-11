import './index.css';

import { initialCards, options, elementsContainer, profTitle, profSubtitle, addCardButton,
  profileEditButton, inputTitle, inputLink, jobInput, nameInput, editProfilePopup, profileEditForm,
  createCardForm, openImage, zoomImage, titleBigImage, closeButtons } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//для submit формы редактирования профиля
const popup = new Popup('.popup_edit');

//отображением информации о пользователе на странице
const userInfo = new UserInfo({
  name: profTitle,
  job: profSubtitle
});

//создать карточку
const createCard = (...args) => {
  return new Card(...args).generateCard();
};

//визуализировать карты из массива
const renderCards = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = createCard(item, '#card-template', handleCardClick);

    renderCards.addItem(card);
  }
}, elementsContainer);
renderCards.renderItems();

//валидация формы редактирования
const validatorFormEdit = new FormValidator(options, profileEditForm);
validatorFormEdit.enableValidation();

//валидация формы добавления карточки
const validatorFormAdd = new FormValidator(options, createCardForm);
validatorFormAdd.enableValidation();
validatorFormAdd.toggleButtonState();

//всплывающее окно с изображением
const popupWithImage = new PopupWithImage('.popup_img');
popupWithImage.setEventListeners();

//всплывающее окно формы редактирования профиля
const profileEditFormPopup = new PopupWithForm('.popup_edit', saveProfileEditForm);
profileEditFormPopup.setEventListeners();

//всплывающее окно формы добавления карты
const cardAddFormPopup = new PopupWithForm('.popup_add', saveFormAddCard);
 
//колбэк сабмита формы редактирования профиля
function saveProfileEditForm() {
  userInfo.setUserInfo({name: nameInput.value, job: jobInput.value})
  popup.close();
};

//колбэк сабмита формы добавления карточки
function saveFormAddCard(data) {
  const card = createCard (data, '#card-template', handleCardClick);
  renderCards.addItem(card);
  cardAddFormPopup.close();
}

//открыть попап с картинкой при клике на карточку
function handleCardClick (link, name) {
  popupWithImage.open(link, name)
}

//открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.about;
  profileEditFormPopup.open();
});

//открыть форму добавления карточки
addCardButton.addEventListener('click', () => cardAddFormPopup.open());
