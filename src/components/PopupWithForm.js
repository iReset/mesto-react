import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { buttonSelector, formSelector, inputSelector }, handleSubmit, getInitial) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
    this._buttonSave = this._popup.querySelector(buttonSelector);
    this._inputList = this._popup.querySelectorAll(inputSelector);
    this._handleSubmit = handleSubmit;
    this._getInitial = getInitial;
    this._textAction = "Сохранить";
    this._textWaiting = "Сохранение...";
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

  setSaveButtonTexts({ textAction, textWaiting }) {
    if (textAction)
      this._textAction = textAction;
    if (textWaiting)
      this._textWaiting = textWaiting;
  }

  setWaitingState(wait) {
    this._buttonSave.textContent = wait ? this._textWaiting : this._textAction;
  }

  _initFields() {
    if (!this._getInitial)
      return;

    const data = this._getInitial();
    // NOTE: Согласен с Вами, что код с колбэком более сложный для восприятия.
    // Но в то же время он имеет и преимущество по сравнению с сеттером: сеттер надо будет не забывать вызывать
    // в каждом месте кода, где будет использован метод open, в то время как колбэк необходимо установить только
    // один раз и при каждом вызове open он будет вызываться автоматически.
    //
    // Я все-таки позволю себе пока оставить существующую реализацию.
    // Не потому, что он лучше, а потому, что опыта пока мало )  Надо поразмышлять )
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
