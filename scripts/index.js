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
const elements = document.querySelector('.elements'); // тег внутрь которого вставляем карточки с использованием шаблона template

const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__button');
const profileEditButton = document.querySelector('.profile__open-popup');

const inputTitle  = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const jobInput = document.querySelector('.popup__input_type_profession');
const nameInput = document.querySelector('.popup__input_type_name');
const editProfileForm = document.querySelector('.popup_edit');
const profileEditForm = document.querySelector('.popup__form_edit');
const createCardForm = document.querySelector('.popup__form_add');
const addCardForm = document.querySelector('.popup_add');
const openImage = document.querySelector('.popup_img');
const zoomImage = document.querySelector('.popup__img');
const titleZoomImage = document.querySelector('.popup__title-img');
const closeButtons = document.querySelectorAll('.popup__close-button');

//Воспроизвести карточки «из коробки»
function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  elements.append(...cards);
}
renderCards(initialCards);

//Открыть попап
function openPopup (item) {
  item.classList.add('popup_opened');
}

//Закрыть попап
function closePopup (item) {
  item.classList.remove('popup_opened');
}

//Сохранить форму обработки
function handleFormSubmit (evt) {
  evt.preventDefault();
  profTitle.textContent = nameInput.value;
  profSubtitle.textContent = jobInput.value;
  closePopup(editProfileForm);
}

//Добавить новую карточку
function addNewCard (evt) {
  evt.preventDefault();

  const titleName = inputTitle.value;
  const linkName = inputLink.value;
  const card = createCard ({name: titleName, link: linkName});
  evt.target.reset();

  elements.prepend(card);
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
    titleZoomImage.textContent = item.name;

    openPopup (openImage);
  });

  return card;
}

//Открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profTitle.textContent;
  jobInput.value = profSubtitle.textContent;
  openPopup (editProfileForm);
});

//Сохранить редактирование профиля
profileEditForm.addEventListener('submit', handleFormSubmit);
//Открыть форму добавления карточки
addCardButton.addEventListener('click', () => openPopup (addCardForm));
//Сохранить новую карточку
createCardForm.addEventListener('submit', addNewCard);
//Закрыть popup
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
