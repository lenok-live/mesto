// Класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.

export default class FormValidator {
  constructor(options, formElement) { //объект настроек; элемент той формы, которая валидируется;
    this._options = options;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));

    this._buttonElement = this._formElement.querySelector(this._options.submitSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  //показать ошибку
  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._options.inputErrorClass); 
    inputElement.classList.add(this._options.inputInvalidClass);
  }

  //скрыть ошибку
  _hidenError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.textContent = '';
    errorElement.classList.remove(this._options.inputErrorClass);
    inputElement.classList.remove(this._options.inputInvalidClass);
  }

  //переключить состояние ввода
  _toggleInputState(inputElement) {
    if (inputElement.validity.valid) {
      this._hidenError(inputElement);
    } else {
      this._showError(inputElement); 
    }
  }

  //состояние кнопки при валидации
  toggleButtonState() {
    const formIsValid = this._inputList.every(inputElement => inputElement.validity.valid);
    
    if (formIsValid) {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._options.disabledButtonClass);
    } else {
      this._buttonElement.setAttribute('disabled', true); 
      this._buttonElement.classList.add(this._options.disabledButtonClass);
    }
  }

  _setEventListeners() {
     this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputState(inputElement);
        this.toggleButtonState();
      });
    });
    this.toggleButtonState();
  }
}
