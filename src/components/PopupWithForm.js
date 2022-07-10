import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { buttonSelector, formSelector, inputSelector }, handleSubmit, getInitial) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
    this._buttonSave = this._popup.querySelector(buttonSelector);
    this._inputList = this._popup.querySelectorAll(inputSelector);
    this._handleSubmit = handleSubmit;
    this._getInitial = getInitial;
  }

  getForm() {
    return this._form;
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    this._initFields();
    this.setWaitingState(false);
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit.bind(this));
  }

  setWaitingState(wait) {
    this._buttonSave.textContent = wait ? 'Сохранение...' : 'Сохранить';
  }

  _initFields() {
    if (!this._getInitial)
      return;

    const data = this._getInitial();
    this._inputList.forEach(input => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  _submit(event) {
    event.preventDefault();
    this.setWaitingState(true);
    this._handleSubmit(this._getInputValues());
  }
}
