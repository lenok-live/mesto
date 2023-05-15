const options = {
  formSelector: '.popup__container', 
  inputSelector: '.popup__input',
  submitSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_inactive',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input-error_active',
  inputSectionSelector: '.popup__section',
  inputInvalidClass: 'popup__input_invalid' 
};

const elementsContainer = document.querySelector('.elements'); // тег внутрь которого вставляем карточки с использованием шаблона template

const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const editAvatar = document.querySelector('.profile__avatar-cover');
const addCardButton = document.querySelector('.profile__button');
const profileEditButton = document.querySelector('.profile__open-popup');

const jobInput = document.querySelector('.popup__input_type_profession');
const nameInput = document.querySelector('.popup__input_type_name');

const profileEditForm = document.querySelector('.popup__form_edit');
const createCardForm = document.querySelector('.popup__form_add');
const updateAvatarForm = document.querySelector('.popup__form_avatar');

const addCardPopup = document.querySelector('.popup_add').querySelector('.popup__save-button');
const editProfilePopup = document.querySelector('.popup_edit').querySelector('.popup__save-button');
const editAvatarPopup = document.querySelector('.popup_avatar').querySelector('.popup__save-button');

export { options, elementsContainer, profTitle, profSubtitle, profileAvatar, editAvatar, addCardButton,
profileEditButton, jobInput, nameInput, profileEditForm,
createCardForm, addCardPopup, updateAvatarForm, editProfilePopup, editAvatarPopup };


// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

//const openImage = document.querySelector('.popup_img');
//const zoomImage = document.querySelector('.popup__img');
//const titleBigImage = document.querySelector('.popup__title-img');
//const closeButtons = document.querySelectorAll('.popup__close-button');
//const inputTitle  = document.querySelector('.popup__input_type_title');
//const inputLink = document.querySelector('.popup__input_type_link');

