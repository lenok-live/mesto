// класс Popup, который отвечает за открытие и закрытие попапа
// принимает в конструктор единственный параметр — селектор попапа

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //логика закрытия попапа клавишей Esc
  _handleEscClose = (event) => {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  //метод, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);

    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup__close-button') || e.target === this._popup) {
        this.close();
      }
    })
  }
}