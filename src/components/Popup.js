export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._button = this._popup.querySelector('.popup__close-button');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscape.bind(this));
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscape.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        const close = this.close.bind(this);
        close();
      }
    });
    this._button.addEventListener('click', this.close.bind(this));
  }

  _handleEscape(event) {
    if (event.key !== 'Escape') {
      return;
    }
    this.close();
  }
}
