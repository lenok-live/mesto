import { initialCards, options, elementsContainer, profTitle, profSubtitle, addCardButton,
  profileEditButton, inputTitle, inputLink, jobInput, nameInput, editProfilePopup, profileEditForm,
  createCardForm, addCardPopup, openImage, zoomImage, titleBigImage, closeButtons } from '../utils/constants.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';


//создать карточку
const createCard = (...args) => {
  return new Card(...args).generateCard();
};

// const popupAvatarEdit = new PopupWithForm('popup_edit');

// object = {
//   title: 'pp'
//   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
// }
//const section = new Section()
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
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//закрыть попап
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

//закрыть попап кнопкой Esc
function closePopupEsc (event) {
  if(event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//закрыть попап по нажатию на оверлей
document.querySelectorAll('.popup').forEach(item => {
  item.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(item)
    }
  })
});

//сохранить форму редактирования
function saveProfileEditForm (evt) {
  evt.preventDefault();
  profTitle.textContent = nameInput.value;
  profSubtitle.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

function handleCardClick (link, name) {
  zoomImage.src = link;
  zoomImage.alt = name;
  titleBigImage.textContent = name;
  
  openPopup (openImage);
}

//открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profTitle.textContent;
  jobInput.value = profSubtitle.textContent;
  openPopup (editProfilePopup);
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