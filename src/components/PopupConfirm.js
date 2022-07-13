import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(selector, { buttonSelector, formSelector }) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
    this._buttonConfirm = this._popup.querySelector(buttonSelector);
    this._handleSubmit = null;
    this._textConfirmation = 'Да';
    this._textWaiting = 'Ожидание...';
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit.bind(this));
  }

  setHandler(handler) {
    this._handleSubmit = handler;
  }

  setConfirmButtonTexts({ textConfirmation, textWaiting }) {
    if (textConfirmation)
      this._textConfirmation = textConfirmation;
    if (textWaiting)
      this._textWaiting = textWaiting;
  }

  setWaitingState(wait) {
    this._buttonConfirm.textContent = wait ? this._textWaiting : this._textConfirmation;
  }

  _submit(event) {
    event.preventDefault();
    this.setWaitingState(true);
    this._handleSubmit();
  }
}
