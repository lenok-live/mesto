import { initialCards, options, elementsContainer, profTitle, profSubtitle, addCardButton,
  profileEditButton, inputTitle, inputLink, jobInput, nameInput, editProfilePopup, profileEditForm,
  createCardForm, addCardPopup, openImage, zoomImage, titleBigImage, closeButtons } from '../utils/constants.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';

//создать карточку
const createCard = (...args) => {
  return new Card(...args).generateCard();
};

const popupWithImage = new PopupWithImage('.popup_img');
popupWithImage.setEventListeners();

const popup = new Popup('.popup_edit');
//const close = popup.close();


//валидация формы редактирования
const validatorFormEdit = new FormValidator(options, profileEditForm);
validatorFormEdit.enableValidation();

//валидация формы добавления карточки
const validatorFormAdd = new FormValidator(options, createCardForm);
validatorFormAdd.enableValidation();
validatorFormAdd.toggleButtonState();

//визуализировать карты из массива
const renderCards = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = createCard(item, '#card-template', handleCardClick);
    //const cardElement = card.generateCard();
    renderCards.addItem(card);
  }
}, elementsContainer);
renderCards.renderItems();



// воспроизвести карточки «из коробки»
// function renderCards(items) {
//  const cards = items.map((item) => {
//    return createCard(item, '#card-template', handleCardClick);
//  });
//  elementsContainer.append(...cards);
// };
// renderCards(initialCards);

//добавить новую карточку
function addNewCard (evt) {
  evt.preventDefault();

  const titleName = inputTitle.value;
  const linkName = inputLink.value;
  const card = createCard ({name: titleName, link: linkName}, '#card-template', handleCardClick);
  evt.target.reset();
  // evt.submitter.classList.add('popup__save-button_inactive');
  // evt.submitter.disabled = true;
  elementsContainer.prepend(card);
  closePopup(addCardPopup);
};


//открыть попап
// function openPopup (item) {
//   item.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEsc);
// };

// //закрыть попап
// function closePopup (item) {
//   item.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEsc);
// };

// //закрыть попап кнопкой Esc
// function closePopupEsc (event) {
//   if(event.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// };

// //закрыть попап по нажатию на оверлей
// document.querySelectorAll('.popup').forEach(item => {
//   item.addEventListener('mousedown', (evt) => {
//     if(evt.target === evt.currentTarget) {
//       closePopup(item)
//     }
//   })
// });


const profileEditFormPopup = new PopupWithForm('.popup_edit', saveProfileEditForm)
profileEditFormPopup.setEventListeners();

//сохранить форму редактирования
function saveProfileEditForm () {
  //evt.preventDefault();
  profTitle.textContent = nameInput.value;
  profSubtitle.textContent = jobInput.value;
  popup.close();
};

function handleCardClick (link, name) {
  // zoomImage.src = link;
  // zoomImage.alt = name;
  // titleBigImage.textContent = name;
  
  // openPopup (openImage);
  popupWithImage.open(link, name)
}

//открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profTitle.textContent;
  jobInput.value = profSubtitle.textContent;
  profileEditFormPopup.open();
});

//сохранить редактирование профиля
profileEditForm.addEventListener('submit', saveProfileEditForm);

//открыть форму добавления карточки
addCardButton.addEventListener('click', () => openPopup (addCardPopup));

//сохранить новую карточку
createCardForm.addEventListener('submit', addNewCard);

//закрыть popup
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
