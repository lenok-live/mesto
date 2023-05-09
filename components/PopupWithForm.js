//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
//Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._form.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValue() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }
}