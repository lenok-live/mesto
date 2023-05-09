// класс Popup, который отвечает за открытие и закрытие попапа
// принимает в конструктор единственный параметр — селектор попапа

export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //логика закрытия попапа клавишей Esc
  _handleEscClose = (event) => {
    if(event.key === 'Escape') {
    //?const popupOpened = document.querySelector('.popup_opened');
      this.close();
    }
  }

  //метод, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {

  }
}