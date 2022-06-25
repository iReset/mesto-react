import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { formSelector, inputSelector }, handleSubmit, getInitial) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
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
    if (this._getInitial) {
      const data = this._getInitial();
      this._inputList.forEach(input => {
        if (data[input.name]) {
          input.value = data[input.name];
        }
      });
    }
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit.bind(this));
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
    this._handleSubmit(this._getInputValues());
    this.close();
  }
}
