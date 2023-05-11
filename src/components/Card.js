//Класс Card, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
//содержит публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
//Для каждой карточки создайте экземпляр класса Card.

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //шаблон разметки карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._cardDelete = cardElement.querySelector('.element__btn-trash');
    this._like = cardElement.querySelector('.element__btn-like');
    this._cardImage = cardElement.querySelector('.element__image');

    return cardElement;
  }

  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();

    this._setEventListener();

    this._cardImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.alt = this._name;
    
    return this._element;
  }

  //удалить по клику
  _handleDeleteClick() {
    this._element.remove();
  }
  
  //поставить лайк
  _toggleLike() {
    this._like.classList.toggle('element__btn-like_active')
  }

  _setEventListener() {
    //удаление карточки
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    //лайк на карточку
    this._like.addEventListener('click', () => {
      this._toggleLike();
    });

    //открытие изображения на весь экран
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  } 
}