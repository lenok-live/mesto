//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
//Для каждой карточки создайте экземпляр класса Card.

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._like = cardElement.querySelector('.element__btn-like');
    this._cardDelete = cardElement.querySelector('.element__btn-trash');
    this._cardImage = cardElement.querySelector('.element__image');

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;

}
}
