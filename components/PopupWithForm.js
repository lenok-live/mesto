//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//Содержит приватный метод _getInputValues, который собирает данные всех полей формы.

//Перезаписывает родительский метод setEventListeners. Метод setEventListeners 
//класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
//но и добавлять обработчик сабмита формы.

//Перезаписывает родительский метод close, т.к. при закрытии попапа форма должна сбрасываться.

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form'); //
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
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
    //this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValue())
    })
  }
}