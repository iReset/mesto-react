import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, { captionSelector, imageSelector }) {
    super(selector);
    this._caption = this._popup.querySelector(captionSelector);
    this._image = this._popup.querySelector(imageSelector);
  }

  close() {
    super.close();
  }

  open({ link, alt = name, name }) {
    this._image.src = link;
    this._image.alt = alt;
    this._caption.textContent = name;
    super.open();
  }
}
