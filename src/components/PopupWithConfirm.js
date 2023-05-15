import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form'); 
  }

  open(card) {
    super.open();
    this._card = card;
  }

  _handleSubmitClick = (e) => {
    e.preventDefault();
    this._submitHandler(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitClick);
  }
}