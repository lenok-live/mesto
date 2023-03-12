//скрыть ошибка
const hidenError = (errorElement, options, inputElement) => {
  errorElement.innerText = '';
  errorElement.classList.remove(options.inputErrorClass);
  inputElement.classList.remove(options.inputInvalidClass);
};

//показать ошибку
const showError = (errorElement, message, options, inputElement) => {
  errorElement.innerText = message;
  errorElement.classList.add(options.inputErrorClass);
  inputElement.classList.add(options.inputInvalidClass);
};

//переключить состояние ввода
const toggleInputState = (inputElement, options) => {
  const isValid = inputElement.validity.valid;
  const inputFormElement = inputElement.closest(options.inputSectionSelector);
  const errorElement = inputFormElement.querySelector(options.inputErrorSelector);

  if (isValid) {
    hidenError(errorElement, options, inputElement);
  } else {
    showError(errorElement, inputElement.validationMessage, options, inputElement);
  }
};

const enableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
  const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

  if (formIsValid) {
    enableButton(submitElement, disabledButtonClass);
  } else {
    disableButton(submitElement, disabledButtonClass);
  }
};

const setEventListeners = (form, options) => {
  const submitElement = form.querySelector(options.submitSelector);
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));

  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleInputState(inputElement, options);
      toggleButtonState(inputs, submitElement, options.disabledButtonClass);
    });
  });
  toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));

  forms.forEach(form => {
    setEventListeners(form, options);
  });
};
