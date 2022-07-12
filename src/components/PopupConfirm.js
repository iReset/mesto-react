import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(selector, { formSelector }) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
    this._handleSubmit = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit.bind(this));
  }

  setHandler(handler) {
    this._handleSubmit = handler;
  }

  _submit(event) {
    event.preventDefault();
    this._handleSubmit();
  }
}
