export default class PopupWithImage extends Popup {
  constructor(selector, { captionSelector, imageSelector }) {
    super(selector);
    this._caption = this._popup.querySelector(captionSelector);
    this._image = this._popup.querySelector(imageSelector);
  }

  open({ link, alt = name, name }) {
    this._image.src = link;
    this._image.alt = alt;
    this._caption.textContent = name;
    super.open();
  }

  clear() {
    this._image.src = '';
    this._image.alt = '';
    this._caption.textContent = '';
  }

  close() {
    super.close();
    this.clear();
  }
}
