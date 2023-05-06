import { initialCards, options } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


const elementsContainer = document.querySelector('.elements'); // тег внутрь которого вставляем карточки с использованием шаблона template

const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__button');
const profileEditButton = document.querySelector('.profile__open-popup');

const inputTitle  = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const jobInput = document.querySelector('.popup__input_type_profession');
const nameInput = document.querySelector('.popup__input_type_name');
const editProfilePopup = document.querySelector('.popup_edit');
const profileEditForm = document.querySelector('.popup__form_edit');
const createCardForm = document.querySelector('.popup__form_add');
const addCardPopup = document.querySelector('.popup_add');
const openImage = document.querySelector('.popup_img');
const zoomImage = document.querySelector('.popup__img');
const titleBigImage = document.querySelector('.popup__title-img');
const closeButtons = document.querySelectorAll('.popup__close-button');

//создать карточку
const createCard = (...args) => {
  return new Card(...args).generateCard();
};
//валидация формы редактирования
const validatorFormEdit = new FormValidator(options, profileEditForm);
validatorFormEdit.enableValidation();

//валидация формы добавления карточки
const validatorFormAdd = new FormValidator(options, createCardForm);
validatorFormAdd.enableValidation();
//validatorFormAdd.toggleButtonState();

//воспроизвести карточки «из коробки»
function renderCards(items) {
 const cards = items.map((item) => {
   return createCard(item, '#card-template', handleCardClick);
 });
 elementsContainer.append(...cards);
};
renderCards(initialCards);

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