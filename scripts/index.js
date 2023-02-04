const popupBtnOpen = document.querySelector(".profile__open-popup");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close-button");
const jobInput = document.querySelector(".popup__input_type_profession");
const nameInput = document.querySelector(".popup__input_type_name");
const profTitle = document.querySelector(".profile__title");
const profSubtitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");


// открытие формы редактирования
popupBtnOpen.addEventListener("click", openPopup);

function openPopup () {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profTitle.textContent;
  jobInput.value = profSubtitle.textContent;
}

// закрытие формы редактирования
popupBtnClose.addEventListener("click", closePopup);

function closePopup () {
  popupContainer.classList.remove("popup_opened");
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  profTitle.textContent = nameInput.value;
  profSubtitle.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
