import './index.css';

import { options, elementsContainer, profTitle, profSubtitle, profileAvatar, 
  editAvatar, addCardButton, profileEditButton, jobInput, nameInput, 
  profileEditForm, createCardForm, updateAvatarForm, editProfilePopup, 
  addCardPopup, editAvatarPopup } from '../utils/constants.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

import { api } from '../components/Api.js';
import downloadProcess from '../utils/downloadProcess';

// input -> html
// input -> api -> html

//получаение данных профиля и карточек
Promise.all([
  api.getProfileData(),
  api.getCards()
]).then(([profileData, cards]) => {
  setInitialProfileData(profileData)
  cardsSection.renderItems(cards.reverse());
})

//отображением информации о пользователе на странице
const userInfo = new UserInfo({
  name: profTitle,
  job: profSubtitle,
  avatar: profileAvatar
});

//устанавливаем начальные значение профиля
function setInitialProfileData(profile) {
  userInfo.setUserInfo(profile)
}

//создать карточку
const createCard = (cardData) => {
  const myId = userInfo.getId();
  const card = new Card(cardData, myId, '#card-template', handleCardClick, handleConfirmDeletingCard, handleLikeCard);
  return card.generateCard();
};

function handleLikeCard(cardElement) {
  const cardId = cardElement.getId();
  const isLiked = cardElement.getIsLiked();
  api.updateLike(cardId, isLiked).then((updatedCard) => {
    cardElement.updateLikes(updatedCard.likes)
  })
}

// отрисовка карточки
function renderCard(card) {
  const newCard = createCard(card)
  cardsSection.addItem(newCard);
}

//визуализировать карты
const cardsSection = new Section({ 
  //items: initialCards, 
  renderer: (card) => {
    renderCard(card)
  }
}, elementsContainer);


//валидация формы редактирования
const validatorFormEdit = new FormValidator(options, profileEditForm);
validatorFormEdit.enableValidation();

//валидация формы добавления карточки
const validatorFormAdd = new FormValidator(options, createCardForm);
validatorFormAdd.enableValidation();
validatorFormAdd.toggleButtonState();

//валидация формы редактирования аватара
const validatorAvatarForm = new FormValidator(options, updateAvatarForm);
validatorAvatarForm.enableValidation();

//всплывающее окно с изображением
const popupWithImage = new PopupWithImage('.popup_img');
popupWithImage.setEventListeners();

//всплывающее окно формы редактирования аватара
const avatarProfilePopup = new PopupWithForm('.popup_avatar', handleUpdateAvatar);
avatarProfilePopup.setEventListeners();

//всплывающее окно формы редактирования профиля
const profileEditFormPopup = new PopupWithForm('.popup_edit', saveProfileEditForm);
profileEditFormPopup.setEventListeners();

//всплывающее окно формы добавления карты
const cardAddFormPopup = new PopupWithForm('.popup_add', saveFormAddCard);
cardAddFormPopup.setEventListeners();

//всплывающее окно подтверждения удаления карты
const confirmPopup = new PopupWithConfirm('.popup_confirm', handleConfirmDeleteCardClick);
confirmPopup.setEventListeners();

//колбэк формы редактирования аватара
function handleUpdateAvatar(inputValues) {
  downloadProcess(true, editAvatarPopup);
  api.updateAvatar(inputValues).then((updatedProfile) => {
    userInfo.setUserInfo(updatedProfile)
  }).catch(console.error)
  .finally(() => {
    avatarProfilePopup.close();
    downloadProcess(true, editAvatarPopup);
  })
}

//submit confirmForm
function handleConfirmDeleteCardClick(cardElement) {
  const cardId = cardElement.getId()
  api.deleteCard(cardId).then(() => {
    cardElement.remove()
  }).catch(console.error)
  .finally(() => {
    confirmPopup.close()
  })
}

//по клику на корзину
function handleConfirmDeletingCard(element) {
  confirmPopup.open(element)
}
 
//колбэк сабмита формы редактирования профиля
function saveProfileEditForm() {
  downloadProcess(true, editProfilePopup)
  api.updateProfile({
    name: nameInput.value,
    about: jobInput.value
  }).then((updatedProfile) => {
    userInfo.setUserInfo({
      name: updatedProfile.name,
      about: updatedProfile.about
    });profileEditFormPopup.close();
  }).finally(() => 
    downloadProcess(true, editProfilePopup)
  )

  // userInfo.setUserInfo({name: nameInput.value, job: jobInput.value})
  // popup.close();
};

//колбэк сабмита формы добавления карточки
function saveFormAddCard(data) {
  downloadProcess(true, addCardPopup);
  api.createCard(data)
  .then((newCard) => {
    renderCard(newCard);
    cardAddFormPopup.close();
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    downloadProcess(true, addCardPopup)
  })
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
  validatorFormEdit.resetValidation();
});

//открыть форму добавления карточки
addCardButton.addEventListener('click', () => {
  cardAddFormPopup.open();
  validatorFormAdd.resetValidation();
});

//открыть форму редактирования аватара
editAvatar.addEventListener('click', () => {
  avatarProfilePopup.open();
  validatorAvatarForm.resetValidation();
})

