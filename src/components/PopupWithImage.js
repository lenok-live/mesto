//класс PopupWithImage, который наследует от Popup. Класс перезаписывает родительский 
//метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку 
//с src изображения и подписью к картинке.

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__title-img');
  }

  open(link, name) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}