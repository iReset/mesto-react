export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._button = this._popup.querySelector('.popup__close-button');
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
      // Спасибо за предложенную оптимизацию. Мне действительно не приходило в голову такое решение.
      // Но конкретно в данном случае мне психологически комфортнее, когда форма закрывается по _нажатию_ мышкой
      // в пустой области, а не по _отпусканию_. В то же время кнопка, imho, должна реагировать на _отпускание_,
      // поскольку кнопка визуально реагирует на нажатие.
      // Конечно, это сугубо личное мнение.
      if (evt.target.classList.contains('popup')) {
        this.close.bind(this)();
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
