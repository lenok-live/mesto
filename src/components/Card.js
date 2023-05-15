//Класс Card, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
//содержит публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
//Для каждой карточки создайте экземпляр класса Card.

export default class Card {
  constructor(cardData, myId, templateSelector, handleCardClick, handleConfirmDeletingCard, handleLikeCard) {
    this._likes = cardData.likes;
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._cardOwnerId = cardData.owner._id;
    this._myId = myId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDeletingCard = handleConfirmDeletingCard;
    this._handleLikeCard = handleLikeCard;
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

    this._element.querySelector('.element__like-counter').textContent = this._likes.length;

    this.updateLikes(this._likes);
    this._setEventListener();

    if (this._myId !== this._cardOwnerId) {
      this._element.querySelector('.element__btn-trash').classList.add('element__btn-trash_hide')
    }

    this._cardImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;
  }

  //удалить по клику
  remove() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._cardId
  }

  getIsLiked() {
    return this._likes.some((user) => {
      return user._id === this._myId
    })
  }

  updateLikes(likes) {
    this._likes = likes;
    this._element.querySelector('.element__like-counter').textContent = likes.length;
    if (this.getIsLiked()) {
      this._element.querySelector('.element__btn-like').classList.add('element__btn-like_active')
    } else {
      this._element.querySelector('.element__btn-like').classList.remove('element__btn-like_active')
    }
  }

  _setEventListener() {
    //удаление карточки
    this._cardDelete.addEventListener('click', () => {
      this._handleConfirmDeletingCard(this);
    });

    //лайк на карточку
    this._like.addEventListener('click', () => {
      this._handleLikeCard(this);
    });

    //открытие изображения на весь экран
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  } 
}