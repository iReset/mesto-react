export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._handleEscape = this._handleEscape.bind(this);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscape);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscape);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
    this._buttonClose.addEventListener('click', this.close.bind(this));
  }

  _handleEscape(event) {
    if (event.key !== 'Escape') {
      return;
    }
    this.close();
  }
}
