const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.element'); //template
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
const closeButton = document.querySelectorAll('.popup__close-button');


const options = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_inactive',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input-error_active',
  inputSectionSelector: '.popup__section',
  inputInvalidClass: 'popup__input_invalid'
}

//Воспроизвести карточки «из коробки»
function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  elementsContainer.append(...cards);
}
renderCards(initialCards);

//Открыть попап
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Закрыть попап
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//Закрыть попап кнопкой Esc
function closePopupEsc (item) {
  if(item.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрыть попап по нажатию на оверлей
document.querySelectorAll('.popup').forEach(item => {
  item.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(item)
    }
  })
});

//Сохранить форму обработки
function handleFormSubmit (evt) {
  evt.preventDefault();
  profTitle.textContent = nameInput.value;
  profSubtitle.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

//Добавить новую карточку
function addNewCard (evt) {
  evt.preventDefault();

  const titleName = inputTitle.value;
  const linkName = inputLink.value;
  const card = createCard ({name: titleName, link: linkName});
  evt.target.reset();
  evt.submitter.classList.add('popup__save-button_inactive');
  evt.submitter.disabled = true;

  elementsContainer.prepend(card);
  closePopup(addCardPopup);
}

//Создать карточку
function createCard (item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  //Лайк
  card.querySelector('.element__btn-like').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__btn-like')) {
      evt.target.classList.toggle('element__btn-like_active');
    }
  });
  //Удалить
  card.querySelector('.element__btn-trash').addEventListener('click', () => {
    card.remove();
  });
  //Открыть попап с картинкой
  card.querySelector('.element__image').addEventListener('click', () => {
    zoomImage.src = item.link;
    zoomImage.alt = item.name;
    titleBigImage.textContent = item.name;

    openPopup (openImage);
  });

  return card;
}

//Открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profTitle.textContent;
  jobInput.value = profSubtitle.textContent;
  openPopup (editProfilePopup);
});

//Сохранить редактирование профиля
profileEditForm.addEventListener('submit', handleFormSubmit);
//Открыть форму добавления карточки
addCardButton.addEventListener('click', () => openPopup (addCardPopup));
//Сохранить новую карточку
createCardForm.addEventListener('submit', addNewCard);
//Закрыть popup
closeButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

enableValidation(options);
