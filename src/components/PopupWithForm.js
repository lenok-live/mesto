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
    this._form = this._popup.querySelector('.popup__form'); 
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
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

  _handleSubmitClick() {
    //e.preventDefault();
    this._handleFormSubmit(this._getInputValues())
  }
  
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      // перед запросом сохраняем изначальный текст кнопки
      this._submitButton = this._popup.querySelector('.popup__save-button');
      const initialText = this._submitButton.textContent;
      // меняем его, чтобы показать пользователю ожидание
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close()) // закрывается попап в `then`
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }
}