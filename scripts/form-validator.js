export default class FormValidator {
  constructor(form, options) {
    this._form = form;
    this._buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);
    this._inputList = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
    this._inputErrorClass = options.inputErrorClass;

  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _disableButton() {
    this._buttonElement.disabled = true;
  }


  _enableButton() {
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    this._hasInvalidInput() ? this._disableButton() : this._enableButton();
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.hidden = false;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    errorElement.hidden = true;
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._disableButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
